import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Cita } from '../models/cita';
import { CitaService } from '../_services/cita.service';
import { Cotizacion } from '../models/cotizacion';
import { ClienteService } from '../_services/cliente.service';
import { CotizacionService } from '../_services/cotizacion.service';
import { BitacoraService } from '../_services/bitacora.service';

@Component({
  selector: 'app-cotizacion-vista',
  templateUrl: './cotizacion-vista.component.html',
  styleUrls: ['./cotizacion-vista.component.css']
})
export class CotizacionVistaComponent implements OnInit {
  servicios?: Cita[] = [];
  submitted: boolean = false;
  roles: any;
  showAdmin: any;
  showCliente: any;
  nuevaCotizacion: Cotizacion = {
    id: 0,
    idservicio: 0,
    descripcion: '',
    total: 0,
    nota: '',
    createdAt: '',
    estatus: ''
  }
  servicioAct: Cita = {
    id: 0,
    marca: '',
    placas: '',
    modelo: '',
    color: '',
    tipo: '',
    f_salida: '',
    f_entrada: '',
    hora: '',
    descripcion: '',
    idcliente: '',
    cliente: '',
    celular: '',
    vigente: 'Activo'
  }
  message: string = '';

  constructor(private storageService: StorageService, private bitacoraService: BitacoraService, private citaService: CitaService, private clienteService: ClienteService, private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showCliente = this.roles.includes('ROLE_CLIENTE');
    this.showAdmin = this.roles.includes('ROLE_ADMIN');

    this.getServicios();

  }

  items = [{ producto: '', cantidad: 0, precioUnitario: 0 }];
  // propiedades para calcular subtotal, iva y total
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  // Función para actualizar los cálculos cuando se modifican los elementos
  actualizarCalculos() {
    this.subtotal = this.items.reduce((acc, item) => acc + item.cantidad * item.precioUnitario, 0);
    // Suponiendo que el IVA es del 16%, ajusta según tus necesidades
    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.iva;
  }

  agregarFila() {
    this.items.push({ producto: '', cantidad: 0, precioUnitario: 0 });
    this.actualizarCalculos();
  }

  eliminarFila(index: number) {
    this.items.splice(index, 1);
    this.actualizarCalculos();
  }

  getServicios() {
    this.citaService.getAll()
      .subscribe(
        (data: Cita[]) => {
          console.log(data);
          this.servicios = data;
          this.servicios = this.servicios.filter(servicio => servicio.vigente === 'Activo');
        },
        (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      );
  }

  aplicarDatos(): void {
    this.citaService.get(this.nuevaCotizacion.idservicio).subscribe({
      next: (data) => {
        this.servicioAct = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });


  }


  crearCotizacion() {
    const data = {
      idservicio: this.nuevaCotizacion.idservicio,
      descripcion: JSON.stringify(this.items),
      total: this.total,
      nota: this.nuevaCotizacion.nota,
      estatus: "Pendiente"
    }
    this.cotizacionService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }
}
