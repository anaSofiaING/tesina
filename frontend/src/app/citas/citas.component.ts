import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Cita } from '../models/cita';
import { CitaService } from '../_services/cita.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {

  currentUser: any;
  mensaje: string = "";
  rol: any;//va a mostrar dos tipos de vista este componente

  cita: Cita = {
    id: 0,
    f_salida: '',
    f_entrada: '',
    hora: '',
    marca: '',
    placas: '',
    modelo: '',
    color:'',
    tipo: '',
    descripcion: '',
    cliente: '',
    idcliente: '',
    celular: '',
    vigente: 'Pendiente'
  };
  submitted = false;

  constructor(private citaService: CitaService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.rol = this.storageService.getUser().roles;
    console.log("yo soy rol: " + this.rol);
  }

  saveCita(): void {
    const data = {
      marca: this.cita.marca,
      placas: this.cita.placas,
      modelo: this.cita.modelo,
      color: this.cita.color,
      tipo: this.cita.tipo,
      f_salida: this.cita.f_salida,
      f_entrada: this.cita.f_entrada,
      hora: this.cita.hora,
      descripcion: this.cita.descripcion,
      cliente: this.cita.cliente,
      idcliente: this.cita.idcliente,
      celular: this.cita.celular,
      vigente: 'Pendiente'
    };

    this.citaService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });

    this.newCita();
  }

  newCita(): void {
    this.cita = {
      id: 0,
      f_salida: '',
      f_entrada: '',
      hora: '',
      marca: '',
      placas: '',
      modelo: '',
      tipo: '',
      color:'',
      descripcion: '',
      cliente: '',
      idcliente: '',
      celular: '',
      vigente: 'Pendiente',
    };
  }

  saveMiCita(): void {
    const data = {
      marca: this.cita.marca,
      placas: this.cita.placas,
      modelo: this.cita.modelo,
      tipo: this.cita.tipo,
      color: this.cita.color,
      f_salida: this.cita.f_salida,
      f_entrada: this.cita.f_entrada,
      hora: this.cita.hora,
      descripcion: this.cita.descripcion,
      cliente: this.currentUser.username,
      idcliente: this.currentUser.id,
      celular: this.currentUser.celular,
      vigente: 'Pendiente'
    };
    this.mensaje = "Cita agendada con éxito."
    this.citaService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });

    this.newCita();
  }

}

