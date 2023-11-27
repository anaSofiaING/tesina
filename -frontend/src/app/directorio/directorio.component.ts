import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../_services/cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {
  clientes: Cliente[] = [];
  buscaNombre:String='';
  constructor(private clienteService : ClienteService, private router:Router) { }

  ngOnInit(): void {
    this.clienteService.getAll()
      .subscribe(
        (data: Cliente[]) => {
          console.log(data);
          this.clientes=data;
        },
        (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      );
  }

  detalles(id:any){
    this.router.navigate(['/directorio/'+id]);
  }

  nuevoCliente(){
    this.router.navigate(['/directorio/Crear']);
  }

  buscarCliente(){
    if(this.buscaNombre)
    this.clienteService.findByName(this.buscaNombre).subscribe(
      (data: Cliente[]) => {
        this.clientes=data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
    else  
    this.clienteService.getAll()
    .subscribe(
      (data: Cliente[]) => {
        console.log(data);
        this.clientes=data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

}
