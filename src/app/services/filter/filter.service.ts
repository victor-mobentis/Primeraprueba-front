import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private _http: HttpClient,
    private _loginServices: LoginService
  ) {
  }

  getFiltersForComponent(componentId: string | undefined): Observable<any> {
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http
      .get(`${this.apiUrl}/api/filters/${componentId}`, options)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getSavedFilters(componentId: string): Observable<any> {
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http
    .get(`${this.apiUrl}/api/filters/saved/${componentId}`, options)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  saveFilter(componentId:string, nombre: string, filtros: any[]): Observable<any> {
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    console.log(filtros)
    console.log(typeof(filtros))
    return this._http.post<any>(
      `${this.apiUrl}/api/filters/saved/${componentId}`,
      { nombre, filtros },
      options
    );
  }

  deleteFilter(id: number) {

    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.delete<any>(
      `${this.apiUrl}/api/filters/saved/${id}`,
      options
    );
  }

  getFilterOptions(endpoint: string): Observable<any[]> {

    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http
      .get(`${this.apiUrl}/api/filters/${endpoint}`, options)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }


  /**
   * Obtiene la configuración de filtros para un componente específico
   * Incluye el nombre del campo de empresa_id correcto según el contexto
   */
  getFilterConfig(componentId: string): Observable<any> {
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http
      .get(`${this.apiUrl}/api/filters/config/${componentId}`, options)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  
}
