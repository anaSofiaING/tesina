import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(celular: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        celular,
        password,
      },
      httpOptions
    );
  }

  register(username: string,celular:string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        celular,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(AUTH_API + 'getAllUsers');
  }

  getUser(id:any): Observable<Usuario> {
    return this.http.get<Usuario>(AUTH_API + `${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(AUTH_API + `${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(AUTH_API + `${id}`);
  }
}
