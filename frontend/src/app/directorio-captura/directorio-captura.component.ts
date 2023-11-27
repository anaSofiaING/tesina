
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../_services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-directorio-captura',
  templateUrl: './directorio-captura.component.html',
  styleUrls: ['./directorio-captura.component.css']
})
export class DirectorioCapturaComponent implements OnInit {

  constructor(private router:Router,private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  nuevo: Cliente = {
    id: 0,
    nombre: '',
    celular: '',
    telefono: '',
    vehiculo: '',
    observaciones: ''
  };
  
  
  message = '';
  regresar(){
    this.router.navigate(['/directorio']);
  }
  crearNuevo(): void {
    const data = {
      nombre: this.nuevo.nombre,
      telefono: this.nuevo.telefono,
      celular:this.nuevo.celular,
      vehiculo:this.nuevo.vehiculo,
      observaciones:this.nuevo.observaciones

    };

    this.clienteService.create(data).subscribe({
      next: (res) => {
        console.log(res);  
        this.message = 'Registro exitoso!';    },
      error: (e) => console.error(e)
    });

    this.nuevo={
      id:0,
      nombre: "",
      telefono: "",
      celular:"",
      vehiculo:"",
      observaciones:""
    }
  }

}
