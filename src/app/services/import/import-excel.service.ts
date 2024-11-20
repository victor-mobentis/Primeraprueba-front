import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService {

  constructor(
    private _http: HttpClient,
    private _loginServices: LoginService
  ) {}


  importExcel(recarga: any) {
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    /*
    return this._http
      .post(
        `${this.baseUrl}:${this.puerto_integracion}/api/input`,
        recarga,
        options
      )
      .pipe(
        map((data: any) => {
          // Aquí puedes realizar cualquier transformación necesaria en los datos
          return data.status;
        })
      );
      */
  }
}
