import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../auth/login.service';
import { Observable, map } from 'rxjs';
import { IRechazo } from 'src/app/models/rechazos.model';
import { IEstadosRechazoCount } from 'src/app/models/count.model';

@Injectable({
  providedIn: 'root',
})
export class RechazadosService {
  
  constructor(
    private _http: HttpClient,
    private _loginServices: LoginService
  ) {}

  getRechazos(
    selectedFilters: { [key: string]: any },
    searchTerm: string,
    currentPage: number,
    itemsPerPage: number,
    sortColumn: string,
    sortDirection: string
  ): Observable<IRechazo[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    console.log(searchTerm);
    return this._http
      .post<IRechazo[]>(
        `${baseUrl}:${port}/api/rechazo`,
        {
          selectedFilters,
          searchTerm,
          currentPage,
          itemsPerPage,
          sortColumn,
          sortDirection,
        },
        options
      )
      .pipe(
        map((data: any) => {
          console.log(data);
          return data;
        })
      );
  }

  countEstadosRechazos(): Observable<IEstadosRechazoCount[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<IEstadosRechazoCount[]>(
      `${baseUrl}:${port}/api/rechazo/count`,
      options
    );
  }
  /* nueva funcion para actualizar rechazos */
  updateRechazo(rechazo: IRechazo ) {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    console.log(rechazo);
    return this._http
      .post(
        `${baseUrl}:${port}/api/rechazo/update/${rechazo.id}`,
        {
          status: rechazo.status,
          status_id: rechazo.status_id,
          reason_rejection: rechazo.reason_rejection,
          reason_rejection_id: rechazo.reason_rejection_id,
          competitor_id: rechazo.competitor_id,
          competitor_name: rechazo.competitor_name ,
          corrective_action_value: rechazo.corrective_action_value,
          corrective_action_symbol_id: rechazo.corrective_action_symbol_id,
          corrective_action_symbol: rechazo.corrective_action_symbol,
          corrective_action_text: rechazo.corrective_action_text,
        },
        options
      )
      .pipe(
        map((data: any) => {
          console.log('Respuesta del servidor:', data);
          return data.status;
        })
      );
  }

  updateEstadoAccionCorrectora(newStatus: { statusId: number; statusText: string; }, id_rechazo:number) {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    console.log(id_rechazo)
    return this._http
      .post(
        `${baseUrl}:${port}/api/rechazo/corrective-action/update/${id_rechazo}`,
        {
          corrective_action_status_id: newStatus.statusId,
          corrective_action_status: newStatus.statusText
        },
        options
      )
      .pipe(
        map((data: any) => {
          console.log('Respuesta del servidor:', data);
          return data.status;
        })
      );
  }

  
}
