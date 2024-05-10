import { NgModule } from '@angular/core';
import { ClientsGeneralComponent } from './clients-general/clients-general.component';
import { ClientRoutingModule } from './clients-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        ClientsGeneralComponent
    ],
    imports:[
        CommonModule,
        ClientRoutingModule
    ],
    providers: [],
    bootstrap: [ClientsGeneralComponent]
})

export class ClientsModule{}