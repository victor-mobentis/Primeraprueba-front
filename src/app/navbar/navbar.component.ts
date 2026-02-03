import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ProfileEditPopupComponent } from '../configuration/configuration-general/profile-edit-popup/profile-edit-popup.component';
import { MenuService } from '../core/services/menu/menu.service';
import { MenuItem } from 'src/app/models/menuItem.model';
import { LanguageService } from '../core/services/language/language.service';
import { LoginService } from '../core/services/auth/login.service';
import { AuthorizationService } from '../core/services/auth/authorization.service';
import { UsersService } from '../core/services/users/users.service';
import { TranslationService } from '../core/services/i18n/translation.service';

@Component({
  selector: 'mobentis-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navbarNav', { static: false }) navbarNav!: ElementRef;
  menuOpen = false;
  profileMenuOpen = false;
  menuItems: any[] = [];

  /* apartado de navbar vertical */
  isToggled = false; /* Indica si el navbar está fijo */
  isHovered = false; /* Indica si el mouse está sobre el navbar */
  isCollapsed = true; /* Indica si el navbar está colapsado */
  isHovering = false;
  isButtonHovered = false;

  // Idiomas disponibles
  selectedLanguage: string = 'es';
  availableLanguages: any[] = []; // Idiomas cargados desde BD

  handleToggleButton() {
    this.isToggled = !this.isToggled; /* Alterna entre fijo y comprimido */
    this.isHovered = false;
    this.updateNavbarState();
  }

  changeLanguage(langCode: string) {
    console.log('🌐 Cambiando idioma a:', langCode);
    this.selectedLanguage = langCode;

    // Usar el TranslationService que maneja todo el proceso
    this.translationService.setLanguage(langCode);
  }

  private loadMenuItems(language: string) {
    this._menuService.getMenuItems(1, language).subscribe(
      (items) => {
        if (items && Array.isArray(items)) {
          this.menuItems = this.mapItems(items, null);
        } else {
          this.menuItems = [];
        }
      },
      (error) => {
        console.error('Error al cargar menús:', error);
        this.menuItems = [];
      }
    );
  }

  getSelectedLanguage() {
    return this.availableLanguages.find(lang => lang.code === this.selectedLanguage);
  }

  onMouseEnter() {
    if (!this.isToggled) {
      this.isHovered = true;
      this.updateNavbarState();
    }
  }
  onMouseLeave() {
    this.isHovered = false;
    this.updateNavbarState();
  }
  /** Maneja cuando el mouse entra al botón */
  onButtonMouseEnter(event: MouseEvent) {
    const elementoOrigen = event.relatedTarget as HTMLElement;
    if (elementoOrigen.id == "sidenav") {
      this.isHovered = true;
    }
    this.isButtonHovered = true;
    this.updateNavbarState();
  }
  /** Maneja cuando el mouse sale del botón */
  onButtonMouseLeave() {
    this.isButtonHovered = false;
    this.isHovered = false;
    this.updateNavbarState();
  }
  updateNavbarState() {
    // Si está fijado o el mouse está sobre el navbar o el botón, el navbar se expande
    this.isCollapsed = !(
      this.isToggled ||
      this.isHovered ||
      this.isButtonHovered
    );
  }

  constructor(
    public _loginServices: LoginService,
    public _menuService: MenuService,
    public authorizationService: AuthorizationService,
    private router: Router,
    public dialog: MatDialog,
    private languageService: LanguageService,
    private usersService: UsersService,
    private translationService: TranslationService
  ) {
    // Inicializar idioma desde TranslationService
    this.selectedLanguage = this.translationService.getCurrentLanguage();

    // Suscribirse a cambios de idioma
    this.translationService.currentLang$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }
  ngAfterViewInit() {
    this.closeNavbar();
  }

  ngOnInit(): void {
    // Cargar idioma guardado al iniciar
    const savedLang = this.translationService.getCurrentLanguage();
    this.selectedLanguage = savedLang;

    // Cargar idiomas disponibles desde la base de datos
    this.translationService.getAvailableLanguages().subscribe({
      next: (languages) => {
        this.availableLanguages = languages;
        console.log('🌍 Idiomas disponibles cargados desde BD:', languages);
      },
      error: (error) => {
        console.error('❌ Error al cargar idiomas disponibles:', error);
        // Si falla, usar español como fallback
        this.availableLanguages = [
          { code: 'es', name: 'Español', isDefault: 1, active: 1 }
        ];
      }
    });

    // Cargar menús con el idioma actual del usuario
    const currentLanguage = this.languageService.getCurrentLanguage();
    this.loadMenuItems(currentLanguage);
  }

  mapItems(items: any[], parentId: number | null): any[] {
    const filteredItems = items.filter(
      (item) => item.parent_menu_id === parentId
    );

    // Recursión para submenús con filtrado por roles
    const mappedItems = filteredItems
      .filter(item => this.shouldShowMenuItem(item))
      .map((item) => {
        let submenuItems = this.mapItems(items, item.id);

        // Enrich Dashboard with submenus if it's the top level item
        if (item.label === 'Dashboard' && parentId === null) {
          submenuItems = this.getDashboardSubmenus();
        }

        return {
          ...item,
          isSubmenuOpen: false,
          submenuItems: submenuItems,
        };
      });

    return mappedItems;
  }

  getDashboardSubmenus(): any[] {
    return [
      {
        label: 'Aplicaciones',
        icon: 'bi-grid-fill',
        isSubmenuOpen: false,
        submenuItems: [
          {
            label: 'Ventas',
            icon: 'bi-cart-check-fill',
            route: '/sales',
            submenuItems: [
              { label: 'Presupuestos', route: '/sales/budgets' },
              { label: 'Pedidos', route: '/sales/orders' },
              { label: 'Albaranes', route: '/sales/delivery-notes' },
              { label: 'Facturas', route: '/sales/invoices' }
            ]
          },
          { label: 'Agenda', icon: 'bi-calendar-event-fill', route: '/agenda' },
          { label: 'Tesoreria', icon: 'bi-wallet-fill', route: '/treasury' },
          { label: 'Clientes', icon: 'bi-people-fill', route: '/clients' },
          { label: 'Catalogo', icon: 'bi-journal-bookmark-fill', route: '/catalog' }
        ]
      },
      {
        label: 'Mantenimientos',
        icon: 'bi-tools',
        isSubmenuOpen: false,
        submenuItems: [
          { label: 'M. Ventas', icon: 'bi-receipt', route: '/maintenance/sales' },
          { label: 'M. Tesoreria', icon: 'bi-cash-coin', route: '/maintenance/treasury' },
          { label: 'M. Clientes', icon: 'bi-person-gear', route: '/maintenance/clients' },
          { label: 'Equipos', icon: 'bi-display', route: '/maintenance/equipment' },
          { label: 'Miscelaneo', icon: 'bi-gear-wide-connected', route: '/maintenance/misc' }
        ]
      },
      {
        label: 'Informes',
        icon: 'bi-file-earmark-bar-graph',
        isSubmenuOpen: false,
        submenuItems: [
          { label: 'Ventas', icon: 'bi-bar-chart-line-fill', route: '/reports/sales' },
          { label: 'Tesoreria', icon: 'bi-pie-chart-fill', route: '/reports/treasury' },
          { label: 'Agenda', icon: 'bi-calendar-check-fill', route: '/reports/agenda' },
          { label: 'Clientes', icon: 'bi-person-lines-fill', route: '/reports/clients' }
        ]
      },
      {
        label: 'Modulos adicionales',
        icon: 'bi-puzzle-fill',
        isSubmenuOpen: false,
        submenuItems: [
          { label: 'Actions', icon: 'bi-lightning-fill', route: '/modules/actions' },
          { label: 'Forms', icon: 'bi-ui-checks', route: '/modules/forms' },
          { label: 'Delivery', icon: 'bi-truck', route: '/modules/delivery' },
          { label: 'Interest', icon: 'bi-bookmark-star-fill', route: '/modules/interest' },
          { label: 'Docs', icon: 'bi-file-earmark-text-fill', route: '/modules/docs' },
          { label: 'Goals', icon: 'bi-bullseye', route: '/modules/goals' },
          { label: 'Services', icon: 'bi-briefcase-fill', route: '/modules/services' }
        ]
      }
    ];
  }

  toggleSubmenu(item: any, event: Event) {
    if (item.submenuItems && item.submenuItems.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      item.isSubmenuOpen = !item.isSubmenuOpen;
    }
  }

  /**
   * Determinar si se debe mostrar un item del menú basándose en roles y permisos
   */
  shouldShowMenuItem(item: any): boolean {
    // Si es el item de configuración, verificar roles O permisos
    if (item.route && (item.route.includes('configuracion') || item.label === 'Configuración')) {
      return this.authorizationService.isAdminOrEditor() ||
        this.authorizationService.hasPermission('VISUALIZADO_CONFIGURACION');
    }

    // Si es el item de usuarios, verificar roles O permisos
    if (item.route && (item.route.includes('users') || item.label === 'Users')) {
      return this.authorizationService.hasRole('Admin') ||
        this.authorizationService.hasPermission('VISUALIZADO_USUARIOS');
    }

    // Por defecto, mostrar el item
    return true;
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

  // Método que cierra el menú
  closeNavbar() {
    const navbar = this.navbarNav?.nativeElement; // Usa `?` para evitar el error de inicialización
    if (navbar && navbar.classList.contains('show')) {
      // Aquí cerramos el colapso del menú
      const navbarToggler = document.querySelector(
        '.navbar-toggler'
      ) as HTMLElement;
      if (navbarToggler) {
        navbarToggler.click(); // Simula un clic en el toggler para cerrarlo
      }
    }
  }

  onSearch(query: string) {
    // Implementa la lógica de búsqueda aquí
    console.log('Buscando:', query);
  }
}
