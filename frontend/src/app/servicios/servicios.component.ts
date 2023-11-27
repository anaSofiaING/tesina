import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita';
import { CitaService } from '../_services/cita.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { BitacoraComponent } from '../bitacora/bitacora.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {


  citas?: Cita[];
  currentIndex = -1;
  title = '';
  opcion = 'Activas';
  private roles: string[] = [];
  isLoggedIn = false;
  showClientBoard = false;
  showAdminBoard = false;
  showWorkerBoard = false;
  username?: string;

  constructor(private citaService: CitaService, private router: Router,
    private storageService: StorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showClientBoard = this.roles.includes('ROLE_CLIENTE');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showWorkerBoard = this.roles.includes('ROLE_TRABAJADOR');

      if (this.showAdminBoard || this.showWorkerBoard) {
        this.retrieveCitas(1);
      }
      if (this.showClientBoard) {
        this.retrieveMisCitas(user.id, user.celular);
      }
    }
  }

  retrieveCitas(aux: number): void {
    this.citaService.getAll()
      .subscribe({
        next: (data) => {
          this.citas = data;
          switch (aux) {
            case 1:
              this.opcion = "Activos";
              this.citas = this.citas.filter(cita => cita.vigente === 'Activo');
              break;
            case 2:
              this.opcion = "Archivados";
              this.citas = this.citas.filter(cita => cita.vigente === 'Archivado');
              break;
            case 3:
              this.opcion = "Pendientes";
              this.citas = this.citas.filter(cita => cita.vigente === 'Pendiente');
              break;
            default:
              this.opcion = "Todos"
              break;
          }

        },
        error: (e) => console.error(e)
      });
  }
  retrieveMisCitas(id: any, celular: any): void {
    this.citaService.getAll()
      .subscribe({
        next: (data) => {
          this.citas = data;
          console.log(data);
          // Filtra las citas basándote en el idCliente y/o número de celular
          this.citas = data.filter(cita => cita.idcliente === id || cita.celular === celular);
          console.log(this.citas);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCitas(1);
    this.currentIndex = -1;
  }

  removeAllCitas(): void {
    this.citaService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  detalles(id: any, vigencia:string) {
    if(vigencia!="Pendiente")
    this.router.navigate(['/bitacora/' + id]);
  }
  archivar(id: any) {
    
    const fecha=new Date();
    const data = {
      vigente: 'Archivado',
      f_salida:fecha
    }
    this.citaService.update(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
    
  }

  recibir(id: any) {
    const fecha=new Date();
    const data = {
      vigente: 'Activo',
      f_entrada: fecha
    }
    console.log(id);
    this.citaService.update(id, data).subscribe({

      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });

  }


  searchTitle(): void {

    this.currentIndex = -1;

    this.citaService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.citas = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}