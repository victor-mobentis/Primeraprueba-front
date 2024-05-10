import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatIconModule } from '@angular/material/icon';

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