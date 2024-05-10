import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsGeneralComponent } from "./clients-general/clients-general.component";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: "global",component: ClientsGeneralComponent },
  ];
@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports:[RouterModule]
})
export class ClientRoutingModule{}