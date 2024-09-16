import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditPopupComponent } from './profile-edit-popup/profile-edit-popup.component';
import { ReasonsRejectionsComponent } from './reasons-rejections/reasons-rejections.component';
import { ConfigurationContainer } from 'src/app/models/configurationContainer.model';


@Component({
  selector: 'app-configuration-general',
  templateUrl: './configuration-general.component.html',
  styleUrls: ['./configuration-general.component.css']
})
export class ConfigurationGeneralComponent {

  constructor(public dialog: MatDialog) { }

  openProfileEditPopup(): void {
    const dialogRef = this.dialog.open(ProfileEditPopupComponent, {
      width: 'auto',
      disableClose: true
    });
  }
  openReasonsRejections(): void{
    const dialogRef = this.dialog.open(ReasonsRejectionsComponent, {
      width: 'auto',
      disableClose: true
    });
  }

  containers: ConfigurationContainer[] = [
    {
      
        title: 'Cuenta',
        items: [
          {
            label: 'Perfil',
            description: 'Personaliza tu perfil',
            type: 'popup',
            popupFunction: () => this.openProfileEditPopup()
          },
          
        ]
      },
      {
      title: 'Importación',
      items: [
        {
          label: 'Importar clientes',
          description: 'Importar clientes desde Excel o CSV',
          type: 'route',
          route: '/mobentis/import/global'
        },
        {
          label: 'Importar vendedores',
          description: 'Importar vendedores desde Excel o CSV',
          type: 'route',
          route: '/mobentis/import/global'
        },
        {
          label: 'Importar rechazos',
          description: 'Importar rechazos desde Excel o CSV',
          type: 'route',
          route: '/mobentis/import/global'
        }
      ]
    },

    {
      title: 'Exportacion',
      items: [
        {
          label: 'Exportar rechazos',
          description: 'Los rechazos se exportan desde su módulo',
          type: 'route',
          route: '/mobentis/rechazos/global'
        }
      ]
    },
    {
      
      title: 'Configuracion',
      items: [
        {
          label: 'Motivo de rechazo',
          description: 'Configura los motivos de rechazo',
          type: 'popup',
          popupFunction: () => this.openReasonsRejections()
        },
        
      ]
    },
    
  ];
}

