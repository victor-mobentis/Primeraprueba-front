export interface ListItem {
    label: string;
    description: string;
    type: 'popup' | 'route';  
    route?: string;  
    popupFunction?: () => void;  
  }