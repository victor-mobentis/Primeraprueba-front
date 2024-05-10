import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { ConfigurationGeneralComponent } from './configuration-general/configuration-general.component';

const routes: Routes =[
    {path: "global", component: ConfigurationGeneralComponent}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule, 
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ConfigurationRoutingModule {}