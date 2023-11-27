
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bitacora } from '../models/bitacora';


const baseUrl = 'http://localhost:8080/api/bitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(baseUrl);
  }

  get(id: any): Observable<Bitacora> {
    return this.http.get<Bitacora>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(`${baseUrl}?title=${title}`);
  }
}