import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KorisnikModel } from '../models/korisnik.model';

const baseUrl = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this._http.post(
      baseUrl + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(user: KorisnikModel): Observable<any> {
    return this._http.post(
      baseUrl + 'register',
      user,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this._http.post(baseUrl + 'signout', { }, httpOptions);
  }

}
