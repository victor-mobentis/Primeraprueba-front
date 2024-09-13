export interface MenuItem {
    label: string;
    route: string;
    hasSubmenu?: boolean;
    submenuItems?: MenuItem[];
    showSubmenu?: boolean; // Agregar esta propiedad
  }