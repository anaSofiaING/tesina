import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../_services/cliente.service';
import { Cliente } from '../models/cliente';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {
  clientes: Cliente[] = [];
  isLoggedIn = false;
  
  private roles: string[] = [];
  showAdminBoard = false;
  buscaNombre:String='';
  constructor(private clienteService : ClienteService, 
    private storageService: StorageService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
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
