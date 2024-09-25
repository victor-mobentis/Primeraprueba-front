import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../auth/login.service';
import { Observable, map, of } from 'rxjs';
import { IPoblacion } from 'src/app/models/poblaciones.model';
import { IProvincia } from 'src/app/models/provincias.model';
import  { IEstado } from'src/app/models/estados.model';
import { ISimbolo } from 'src/app/models/simbolos.model';
import { ICompetidor } from 'src/app/models/competidor.model';
import { IMotivoRechazo } from 'src/app/models/motivoRechazo.model';
import { IFamilia } from 'src/app/models/familia.mode';
import { ISubFamilia } from 'src/app/models/subFamilia.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
    private _http: HttpClient,
    private _loginServices: LoginService
  ) { }


  getFiltersForComponent(componentId: string | undefined): Observable<any> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    /*return this._http.get(`${baseUrl}:${port}/api/filtro/${componentId}`,options).pipe(
      map((data: any) => {
        return data;
      })
    );*/
    return of ([
      {
        "id": "date",
        "type": "date",
        "title": "Fecha"
      },
      {
        "id": "state",
        "type": "multi-select",
        "title": "Estados",
        "optionsEndpoint": "estados"
      },
      {
        "id": "reason_rejection",
        "type": "multi-select",
        "title": "Motivo",
        "optionsEndpoint": "motivos-rechazo"
      },
      {
        "id": "selectCompetidores",
        "type": "multi-select",
        "title": "Competidores",
        "optionsEndpoint": "competidores"
      },
      
      {
        "id": "searchClient",
        "type": "search",
        "title": "Cliente"
      },
      {
        "id": "selectProvince",
        "type": "multi-select",
        "title": "Provincia",
        "optionsEndpoint": "provincias"
      },
      {
        "id": "selectCity",
        "type": "multi-select",
        "title": "Población",
        "optionsEndpoint": "poblaciones"
      },
      {
        "id": "selects1",
        "type": "multi-select",
        "title": "Potencialidad",
        "optionsEndpoint": "segmentacion/1"
      },
      {
        "id": "selects2",
        "type": "multi-select",
        "title": "Tipología",
        "optionsEndpoint": "segmentacion/2"
      },
      {
        "id": "selects3",
        "type": "multi-select",
        "title": "Imagen",
        "optionsEndpoint": "segmentacion/3"
      },
      {
        "id": "searchProduct",
        "type": "search",
        "title": "Producto"
      },
      {
        "id": "selectFamily",
        "type": "multi-select",
        "title": "Familia",
        "optionsEndpoint": "familias"
      },
      {
        "id": "selectSubfamily",
        "type": "multi-select",
        "title": "Subfamilia",
        "optionsEndpoint": "subfamilias"
      },
    ])
  } 

  getFilterOptions(endpoint: string): Observable<any[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get(`${baseUrl}:${port}/api/filtro/${endpoint}`,options).pipe(
      map((data: any) => {
        return data;
      })
    );
  } 

  getProvincias(): Observable<IProvincia[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http
      .get<IProvincia[]>(
        `${baseUrl}:${port}/api/filtro/provincias`,
        options
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getPoblaciones(): Observable<IPoblacion[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http
      .get<IPoblacion[]>(
        `${baseUrl}:${port}/api/filtro/poblaciones`,
        options
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getEstados(): Observable<IEstado[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<IEstado[]>(`${baseUrl}:${port}/api/filtro/estados`, options)
  }

  getCompetidores(): Observable<ICompetidor[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<ICompetidor[]>(`${baseUrl}:${port}/api/filtro/competidores`, options)
  }

  getSimbolos(): Observable<ISimbolo[]>{
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<ISimbolo[]>(`${baseUrl}:${port}/api/filtro/simbolos`, options)
  }

  getMotivosRechazo(): Observable<IMotivoRechazo[]>{
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<IMotivoRechazo[]>(`${baseUrl}:${port}/api/filtro/motivos-rechazo`, options)
  }
  
  /* llamada  a la consulta para familia */
  getFamilias(): Observable<IFamilia[]>{
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<IFamilia[]>(`${baseUrl}:${port}/api/filtro/familias`, options)
  }

  /* llamada  a la consulta para familia */
  getSubFamilias(): Observable<ISubFamilia[]>{
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<ISubFamilia[]>(`${baseUrl}:${port}/api/filtro/subfamilias`, options)
  }
}
