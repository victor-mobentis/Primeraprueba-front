export interface MenuItem {
    id: number;
    parent_menu_id:number;
    icon: string;
    label: string;
    route: string;
    hasSubmenu?: boolean;
    showSubmenu?: boolean; // Agregar esta propiedad
  }