import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditPopupComponent } from 'src/app/configuration/configuration-general/profile-edit-popup/profile-edit-popup.component';
import { ConfigurationContainer } from 'src/app/models/configurationContainer.model';
import { CompanySelectorConfigComponent } from 'src/app/configuration/configuration-general/company-selector-config/company-selector-config.component';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../../core/services/language/language.service';
import { LoginService } from 'src/app/core/services/auth/login.service';
@Injectable({
  providedIn: 'root',
})
export class ListItemService {

  private apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _loginServices: LoginService,
    public dialog: MatDialog,
    private languageService: LanguageService
  ) { }

  private functionRegistry: { [key: string]: () => void } = {
    openProfileEditPopup: () => {
      const dialogRef = this.dialog.open(ProfileEditPopupComponent, {
        width: 'auto',
        disableClose: true,
      });
    },
    openSelectorConfig: () => {
      const dialogRef = this.dialog.open(CompanySelectorConfigComponent, {
        width: 'auto',
        disableClose: true,
      });
    },
  };

  executeFunction(functionName: string) {
    if (this.functionRegistry[functionName]) {
      this.functionRegistry[functionName]();
    } else {
      console.error(`Function ${functionName} not found`);
    }
  }
  getConfigContainers(): Observable<ConfigurationContainer[]> {
    const idioma = this.languageService.getCurrentLanguage();
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<ConfigurationContainer[]>(
      `${this.apiUrl}/api/nav-lists/configuracion?idioma=${idioma}`,
      options
    ).pipe(
      map((data: any) => {
        console.log(data)
        return data;
      })
    );
  }
}
