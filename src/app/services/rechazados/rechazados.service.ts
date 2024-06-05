import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../auth/login.service';
import { Observable, map } from 'rxjs';
import {IRechazo} from 'src/app/models/rechazos.model';

@Injectable({
  providedIn: 'root'
})
export class RechazadosService {

  constructor(
    private _http: HttpClient,
    private _loginServices: LoginService
  ) { }

  getRechazos(): Observable<any[]>{
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http
      .get<IRechazo[]>(
        `${baseUrl}:${port}/api/rechazo/`,
        options
      )
      .pipe(
        map((data: any) => {
          return data.data;
        })
      );
  }
}
