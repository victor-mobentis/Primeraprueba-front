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

  menuItems: MenuItem[] = [
   
  ];

  constructor(
    public _loginServices: LoginService,
    public _menuServices: MenuService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._menuServices.getMenuItems(1, 'es').subscribe(
      (data: any) => {
        console.log(data);
        this.menuItems = data;
      },
      (error) => {
        console.error('Error al cargar el menu', error);
      }
    );
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
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
