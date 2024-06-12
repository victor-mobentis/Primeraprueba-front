import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../auth/login.service';
import { Observable, map } from 'rxjs';
import {IRechazo} from 'src/app/models/rechazos.model';
import {IEstadosRechazoCount} from'src/app/models/count.model';

@Injectable({
  providedIn: 'root'
})
export class RechazadosService {

  constructor(
    private _http: HttpClient,
    private _loginServices: LoginService
  ) { }

  getRechazos(): Observable<IRechazo[]>{
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<IRechazo[]>(`${baseUrl}:${port}/api/rechazo/`, options);
  }

  countEstadosRechazos(): Observable<IEstadosRechazoCount[]>{
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<IEstadosRechazoCount[]>(`${baseUrl}:${port}/api/rechazo/count`, options);
  }

  // Nueva función para actualizar precio y símbolo de promoción
  actualizarPrecioSimboloPromocion(idRechazo: number, idSimbolo: number, precio: number) {
    let schema = localStorage.getItem('schema');
    const baseUrl = localStorage.getItem('baseUrl');
    const port = localStorage.getItem('port');
    const options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.post(`${baseUrl}:${port}/api/rechazo/actualizarPrecioSimboloPromocion`, {
      schema: schema,
      precio: precio,
      idSimbolo: idSimbolo,
    },
  ).pipe(
    map((data: any) => {
      return data.status;
    })
  );
  }

  ////Nueva funcion para accion correctora

  actualizarAccionCorrectora(rechazo_id: number , accion_correctora:string){
    let schema = localStorage.getItem('schema');
    const baseUrl = localStorage.getItem('baseUrl');
    const port = localStorage.getItem('port');
    const options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };

    return this._http
      .put(
        `${baseUrl}:${port}/api/rechazo/actualizarAccionCorrectora/${rechazo_id}`,
        {
          schema: schema,
          accion_correctora: accion_correctora,
        }, options
      )
      .pipe(
        map((data:any) =>{
          return data.status;
        })
      );
  }
}
