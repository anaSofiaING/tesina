import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';


const baseUrl = 'http://localhost:8080/api/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(baseUrl);
  }

  get(id: any): Observable<Cita> {
    return this.http.get<Cita>(`${baseUrl}/${id}`);
  }

  getActivos(): Observable<Cita> {
    return this.http.get<Cita>(`${baseUrl}/vigentes`);
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

  findByTitle(title: any): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${baseUrl}?title=${title}`);
  }
}