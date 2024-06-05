import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IClient } from 'src/app/models/clients.model';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private _http: HttpClient, private _loginServices: LoginService) { }

  /* obtener la lisat de clientes */
  getClients(): Observable<IClient[]> {
    let baseUrl = localStorage.getItem('baseUrl');
    let port = localStorage.getItem('port');
    let options = {
      headers: new HttpHeaders().set(
        'Authorization', 
        `Bearer ${this._loginServices.getToken()}`
      ),
    };
    return this._http.get<IClient[]>(`${baseUrl}:${port}/api/clients/`, options);
  }
}
