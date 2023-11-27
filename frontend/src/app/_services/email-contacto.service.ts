import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailContactoService {
  constructor(private http: HttpClient) { }

  sendMessage(body:any) {
   return this.http.post('http://localhost:8080/formulario', body);
   }
}
