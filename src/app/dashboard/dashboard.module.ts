/**
    * IMPORTS MODULES
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatIconModule } from '@angular/material/icon';
/**
    * IMPORTS COMPONENTS
*/
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';

@NgModule({
    declarations: [
        DashboardGeneralComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatIconModule
    ],
})

export class DahsboardModule { }