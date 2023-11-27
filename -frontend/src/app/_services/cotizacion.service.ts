import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cotizacion } from '../models/cotizacion';


const baseUrl = 'http://localhost:8080/api/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(baseUrl);
  }

  get(id: any): Observable<Cotizacion> {
    return this.http.get<Cotizacion>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${baseUrl}?title=${title}`);
  }
}