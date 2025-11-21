import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersGlobalComponent } from './users-global/users-global.component';

const routes: Routes = [
  { 
    path: 'global', 
    component: UsersGlobalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
