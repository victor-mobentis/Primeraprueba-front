import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersGlobalComponent } from './users-global/users-global.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UsersGlobalComponent,
    CreateUserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule,
    MatDialogModule
  ]
})
export class UsersModule { }
