import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../services/users/users.service';
import { AuthorizationService } from '../../services/auth/authorization.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Md5 } from 'ts-md5';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  position_company: string;
  image: string;
  roles: Role[];
  permissions: Permission[];
  rolePermissions?: Permission[];
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  // Form fields
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  positionCompany: string = '';
  image: string = '';
  selectedRoleIds: number[] = [];
  selectedPermissionIds: number[] = [];

  // Available options
  allRoles: Role[] = [];
  allPermissions: Permission[] = [];

  // UI state
  loading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  imagePreview: string | null = null;
  changePassword: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private usersService: UsersService,
    private authorizationService: AuthorizationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadRolesAndPermissions();
    this.loadUserData();
  }

  loadUserData(): void {
    const user = this.data.user;
    this.name = user.name;
    this.email = user.email;
    this.positionCompany = user.position_company || '';
    this.image = user.image || '';
    this.imagePreview = user.image || null;
    
    // Cargar roles seleccionados
    this.selectedRoleIds = user.roles.map(r => r.id);
    
    // Cargar solo permisos directos (no los heredados de roles)
    this.selectedPermissionIds = user.permissions
      .filter(p => !this.wasPermissionFromRole(user, p.id))
      .map(p => p.id);
  }

  // Verifica si un permiso estaba heredado del rol en el usuario original (solo para carga inicial)
  wasPermissionFromRole(user: User, permissionId: number): boolean {
    return user.rolePermissions?.some(p => p.id === permissionId) || false;
  }

  loadRolesAndPermissions(): void {
    this.authorizationService.getAllRoles().subscribe({
      next: (roles: Role[]) => {
        this.allRoles = roles;
      },
      error: (error: any) => {
        console.error('Error cargando roles:', error);
        this.notificationService.showError('Error al cargar los roles');
      }
    });

    this.usersService.getAllPermissions().subscribe({
      next: (permissions: Permission[]) => {
        this.allPermissions = permissions;
      },
      error: (error: any) => {
        console.error('Error cargando permisos:', error);
        this.notificationService.showError('Error al cargar los permisos');
      }
    });
  }

  toggleRole(roleId: number): void {
    const index = this.selectedRoleIds.indexOf(roleId);
    if (index > -1) {
      // Si es el último rol, no permitir quitarlo
      if (this.selectedRoleIds.length === 1) {
        this.notificationService.showWarning('Debe seleccionar al menos un rol');
        return;
      }
      this.selectedRoleIds.splice(index, 1);
    } else {
      this.selectedRoleIds.push(roleId);
    }
  }

  togglePermission(permissionId: number): void {
    // No permitir desmarcar permisos heredados de roles
    if (this.isPermissionFromRole(permissionId)) {
      return;
    }
    
    const index = this.selectedPermissionIds.indexOf(permissionId);
    if (index > -1) {
      this.selectedPermissionIds.splice(index, 1);
    } else {
      this.selectedPermissionIds.push(permissionId);
    }
  }

  hasRole(roleId: number): boolean {
    return this.selectedRoleIds.includes(roleId);
  }

  hasPermission(permissionId: number): boolean {
    return this.selectedPermissionIds.includes(permissionId);
  }

  // Verifica si el permiso está heredado de alguno de los roles ACTUALMENTE seleccionados
  isPermissionFromRole(permissionId: number): boolean {
    return this.selectedRoleIds.some(roleId => {
      const role = this.allRoles.find(r => r.id === roleId);
      return role?.permissions?.some(p => p.id === permissionId) || false;
    });
  }

  // Verifica si el permiso debe estar marcado (directo o heredado)
  isPermissionChecked(permissionId: number): boolean {
    return this.selectedPermissionIds.includes(permissionId) || this.isPermissionFromRole(permissionId);
  }

  // DEPRECATED: Este método ya no se usa, mantenemos isPermissionFromRole
  isPermissionInherited(permissionId: number): boolean {
    return this.isPermissionFromRole(permissionId);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        this.notificationService.showError('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.notificationService.showError('La imagen no debe superar los 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.image = e.target.result; // Base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.image = '';
    this.imagePreview = null;
  }

  isFormValid(): boolean {
    const basicValidation = 
      this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.isValidEmail(this.email) &&
      this.selectedRoleIds.length > 0;

    if (!this.changePassword) {
      return basicValidation;
    }

    return basicValidation &&
      this.password.trim() !== '' &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  passwordsMatch(): boolean {
    if (!this.changePassword) return true;
    return this.password === this.confirmPassword;
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.notificationService.showError('Por favor completa todos los campos requeridos correctamente');
      return;
    }

    this.loading = true;

    const userData: any = {
      id: this.data.user.id,
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
      position_company: this.positionCompany.trim() || null,
      image: this.image || null,
      roleIds: this.selectedRoleIds,
      permissionIds: this.selectedPermissionIds
    };

    // Solo incluir password si se cambió
    if (this.changePassword && this.password) {
      userData.password = Md5.hashStr(this.password);
    }

    this.usersService.updateUser(userData).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess('Usuario actualizado exitosamente');
        this.dialogRef.close(response);
      },
      error: (error: any) => {
        console.error('Error actualizando usuario:', error);
        const errorMessage = error?.error?.message || 'Error al actualizar el usuario';
        this.notificationService.showError(errorMessage);
        this.loading = false;
      }
    });
  }
}
