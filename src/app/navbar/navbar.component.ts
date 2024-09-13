import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditPopupComponent } from '../configuration/configuration-general/profile-edit-popup/profile-edit-popup.component'; // Ajusta la ruta
import { MenuService } from '../services/menu/menu.service';
import { MenuItem }  from 'src/app/models/menuItem.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuOpen = false;
  profileMenuOpen = false; // Nueva propiedad para manejar el menú de perfil

  menuItems: any[] = [
   
  ];

  constructor(
    public _loginServices: LoginService,
    public _menuService: MenuService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._menuService.getMenuItems(1, 'es').subscribe(
      (items) => {
        if (items && Array.isArray(items)) {
          console.log('Datos recibidos:', items);
          this.menuItems = this.mapItems(items, null);
        } else {
          console.error('Datos recibidos no son válidos:', items);
          this.menuItems = []; // Valores predeterminados si los datos son inválidos
        }
      },
      (error) => {
        console.error('Error al obtener los menús', error);
        this.menuItems = []; // Valores predeterminados en caso de error
      }
    );
  }

  mapItems(items: any[], parentId: number | null): any[] {
    console.log('Filtrando ítems para parentId:', parentId);
  
    const filteredItems = items.filter(item => item.parent_menu_id === parentId);
    console.log('Ítems filtrados:', filteredItems);
  
    // Recursión para submenús
    return filteredItems.map(item => ({
      ...item,
      isSubmenuOpen: false,
      submenuItems: this.mapItems(items, item.id) // Recursión para submenús
    }));
  }

  closeMenu() {
    this.menuOpen = false;
  }

  openSubmenu(item: any) {
    item.isSubmenuOpen = true;
  }

  closeSubmenu(item: any) {
    item.isSubmenuOpen = false;
  }

  toggleSubmenu(item: any) {
    item.isSubmenuOpen = !item.isSubmenuOpen;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  profilePicSize() {
    return '40'; // Tamaño del perfil, puedes ajustar esto si es necesario
  }

  openProfileEditPopup(): void {
    const dialogRef = this.dialog.open(ProfileEditPopupComponent, {
      width: 'auto',
      disableClose: true,
    });
  }

  logout() {
    this._loginServices.logout();
    this.router.navigateByUrl('/login');
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  toggleDropdown(item: MenuItem) {
    if (item.hasSubmenu) {
      item.showSubmenu = true; // Mostrar el submenú
    }
  }

  hideDropdown(item: MenuItem) {
    if (item.hasSubmenu) {
      item.showSubmenu = false; // Ocultar el submenú
    }
  }

  onSearch(query: string) {
    // Implementa la lógica de búsqueda aquí
    console.log('Buscando:', query);
  }
}
