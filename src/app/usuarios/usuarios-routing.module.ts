import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosGlobalComponent } from './usuarios-global/usuarios-global.component';

const routes: Routes = [
  { 
    path: 'global', 
    component: UsuariosGlobalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
