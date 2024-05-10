import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ConfigurationGeneralComponent } from "./configuration-general/configuration-general.component";
import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { MatIconModule } from '@angular/material/icon';



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