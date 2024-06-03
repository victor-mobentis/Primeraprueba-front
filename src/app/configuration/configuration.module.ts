/**
    * IMPORT MODULES
*/
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { MatIconModule } from '@angular/material/icon';
/**
    * IMPORT COMPONENTS
*/
import { ConfigurationGeneralComponent } from "./configuration-general/configuration-general.component";


@NgModule({
    declarations: [
        ConfigurationGeneralComponent,
    ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        MatIconModule
    ],
})
export class ConfigurationModule{}