import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../_services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-directorio-details',
  templateUrl: './directorio-details.component.html',
  styleUrls: ['./directorio-details.component.css']
})
export class DirectorioDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() perfil: Cliente = {
    id: 0,
    nombre: '',
    celular: '',
    telefono: '',
    vehiculo: '',
    observaciones: ''
  };
  
  
  message = '';

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  getUser(id: any): void {
    this.clienteService.get(id)
      .subscribe({
        next: (data) => {
          this.perfil = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  regresar(){
    this.router.navigate(['/directorio']);
  }
  updateDatos(status: boolean): void {
    const data = {
      nombre: this.perfil.nombre,
      telefono: this.perfil.telefono,
      celular:this.perfil.celular,
      vehiculo:this.perfil.vehiculo,
      observaciones:this.perfil.observaciones

    };

    this.message = '';

    this.clienteService.update(this.perfil.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);      },
        error: (e) => console.error(e)
      });
  }

  updateValores(): void {
    this.message = '';

    this.clienteService.update(this.perfil.id, this.perfil)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Cambios guardados exitosamente!';
        },
        error: (e) => console.error(e)
      });

  }

  deleteUser(): void {
    this.clienteService.delete(this.perfil.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          this.router.navigate(['/directorio']);
        },
        error: (e) => console.error(e)
      });
      this.regresar();
  }

}