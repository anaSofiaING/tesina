import { Component, Input, OnInit } from '@angular/core';
import { Cita } from '../models/cita';
import { Bitacora } from '../models/bitacora';
import { BitacoraService } from '../_services/bitacora.service';
import { CitaService } from '../_services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  @Input() viewMode = false;

  @Input() servicio: Cita = {
    id: 0,
    marca: '',
    placas: '',
    modelo: '',
    tipo: '',
    color:'',
    f_salida: '',
    f_entrada: '',
    hora: '',
    descripcion: '',
    idcliente: '',
    cliente: '',
    celular: '',
    vigente: ''
  };

  bitacora: Bitacora = {
    id: 0,
    idCita: 0,
    recepcion: false,
    mecanico:'',
    tanque: '',
    detalles: '',
    kilometraje: '',
    llantaRefa: '',
    herramienta: '',
    chequeo: false,
    diagnostico: '',
    cotizacionId: 0,
    cotizacionAuto: false,
    pruebas: false,
    terminado: false
  }
  edit: boolean = false;
  isLoggedIn = false;
  showCliente = false;
  showAdmin = false;
  user:any;
  showWorker=false;

  private roles: string[] = [];

  constructor(private citaService: CitaService, private bitacoraService: BitacoraService, private route: ActivatedRoute,
    private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getCita(this.route.snapshot.params["id"]);

      this.getBitacora();

      this.isLoggedIn = this.storageService.isLoggedIn();
      if (this.isLoggedIn) {
        this.user = this.storageService.getUser();
        this.roles = this.user.roles;

        this.showCliente = this.roles.includes('ROLE_CLIENTE');
        this.showAdmin = this.roles.includes('ROLE_ADMIN');
        this.showWorker = this.roles.includes('ROLE_TRABAJADOR');
      }
    }
  }
  getCita(id: any): void {
    this.citaService.get(id)
      .subscribe({
        next: (data) => {
          this.servicio = data;
          // console.log(data);
        },
        error: (e) => console.error(e)
      });

  }
  progreso():void{
    const data = {
      cotizacionId: this.bitacora.cotizacionId,
      pruebas: this.bitacora.pruebas
    };
    

    this.bitacoraService.update(this.bitacora.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  getBitacora(): void {
    this.bitacoraService.get(this.route.snapshot.params["id"])
      .subscribe({
        next: (data) => {
          this.bitacora = data;
          console.log(this.bitacora);
        },
        error: (e) => { if(this.showWorker || this.showAdmin){console.error(e); this.nuevaBitacora(); }else{this.router.navigate(['/servicios']);}}
      });

  }

  editar(): void {
    this.edit = true;
  }
  cancelar(): void {
    this.edit = false;
  }
  guardarCambios(): void {
    if (this.bitacora.diagnostico.length > 5) {
      this.bitacora.chequeo = true;
    }
    if(this.showWorker){
      this.bitacora.mecanico=this.user.username;
    }
    const data = {
      tanque: this.bitacora.tanque,
      mecanico: this.bitacora.mecanico,
      detalles: this.bitacora.detalles,
      kilometraje: this.bitacora.kilometraje,
      llantaRefa: this.bitacora.llantaRefa,
      herramienta: this.bitacora.herramienta,
      diagnostico: this.bitacora.diagnostico,
      chequeo: this.bitacora.chequeo
    };
    

    this.bitacoraService.update(this.bitacora.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

    this.edit = false;
  }

  nuevaBitacora(): void {
    const data = {
      idCita: this.route.snapshot.params["id"],
      recepcion: true,
      tanque: '',
      detalles: '',
      kilometraje: '',
      llantaRefa: '',
      herramienta: '',
      chequeo: false,
      diagnostico: '',
      cotizacionId: 0,
      cotizacionAuto: false,
      pruebas: false,
      terminado: false
    };

    this.bitacoraService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

    this.getBitacora();
  }
}
