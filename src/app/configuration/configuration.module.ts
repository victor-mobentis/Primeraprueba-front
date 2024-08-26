/**
    * IMPORT MODULES
*/
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
    * IMPORT COMPONENTS
*/
import { ConfigurationGeneralComponent } from "./configuration-general/configuration-general.component";
import { ProfileEditPopupComponent } from './configuration-general/profile-edit-popup/profile-edit-popup.component';
import { ChangePasswordComponent } from './configuration-general/change-password/change-password.component';
import { UpdatePhotoComponent } from './configuration-general/update-photo/update-photo.component';


@NgModule({
    declarations: [
        ConfigurationGeneralComponent,
        ProfileEditPopupComponent,
        ChangePasswordComponent,
        UpdatePhotoComponent
    ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
    ],
})
export class ConfigurationModule{}