import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  hide = true;
  errorChangePass: boolean = false;
  messageError: string = "";

  changePassForm = this.formBuilder.group({
    emailFormControl: ['', [Validators.required, Validators.email]],
  });

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private formBuilder: FormBuilder,
    private _loginServices: LoginService,
  ) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  changePassword() {
    let email = '';

    if(this.emailFormControl.value){
      this
    }
  }
  cancelar() {
    this.dialogRef.close();
  }

}
