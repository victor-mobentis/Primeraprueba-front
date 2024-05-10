import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ConfigurationGeneralComponent } from "./configuration-general/configuration-general.component";
import { ConfigurationRoutingModule } from "./configuration-routing.module";

@NgModule({
    declarations: [
        ConfigurationGeneralComponent,
    ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule
    ],
})
export class ConfigurationModule{}