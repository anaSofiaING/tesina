import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../_services/cotizacion.service';
import { Cotizacion } from '../models/cotizacion';
import { Router } from '@angular/router';
import { CitaService } from '../_services/cita.service';

import { forkJoin } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { Cita } from '../models/cita';
import { BitacoraService } from '../_services/bitacora.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  cotizaciones?: Cotizacion[];
  info: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showClientBoard = false;
  showAdminBoard = false;
  currentUser: any;
  cotizacion?: Cotizacion;
  citas: Cita[] = [];


  constructor(private cotizacionService: CotizacionService,private bitacoraService:BitacoraService, private citaService: CitaService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.currentUser = this.storageService.getUser();
      this.roles = this.currentUser.roles;

      this.showClientBoard = this.roles.includes('ROLE_CLIENTE');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
    if (this.showAdminBoard) {
      this.getCotizaciones();
    }
    if (this.showClientBoard) {
      this.misCotizaciones();
    }
  }


  getCotizaciones(): void {
    this.cotizacionService.getAll().subscribe(
      (cotizaciones: Cotizacion[]) => {
        this.cotizaciones = cotizaciones

        // Usar forkJoin para manejar múltiples solicitudes simultáneamente
        const observables = cotizaciones.map(cotizacion =>
          this.citaService.get(cotizacion.idservicio)
        );

        forkJoin(observables).subscribe(
          (infoArray: any[]) => {
            console.log(infoArray);

            // Aquí tienes un array con la información adicional para cada cotización
            this.info = infoArray;

            // Ahora puedes trabajar con la información
          },
          (error) => {
            console.error('Error al obtener información adicional:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error al obtener cotizaciones:', error);
      }
    )
  }


  nuevaCotizacion(): void {
    this.router.navigate(['/cotizaciones/Crear']);
  }

  detalles(id: any) {
    this.router.navigate(['/cotizacion/'+ id]);
  }


  misCotizaciones(): void {
    this.citaService.getAll()
      .subscribe({
        next: (data) => {
          this.citas = data;
          // Filtra las citas basándote en el idCliente y/o número de celular
          this.citas = data.filter(cita => cita.idcliente === this.currentUser.id || cita.celular === this.currentUser.celular);

          console.log(this.citas);
          // Obtén los idservicio de las citas filtradas
          const idservicios = this.citas.map(cita => cita.id);

          // Obtén todas las cotizaciones
          this.cotizacionService.getAll().subscribe({
            next: (cotizaciones) => {
              this.cotizaciones = cotizaciones;

              // Filtra las cotizaciones basándote en los idservicio de las citas filtradas
              this.cotizaciones = cotizaciones.filter(cotizacion => idservicios.includes(cotizacion.idservicio));
              console.log(this.cotizaciones);
            },
            error: (error) => console.error('Error al obtener cotizaciones:', error)
          });
        },
        error: (e) => console.error(e)
      });
  }

 aprobarCot(id: any): void {
  const cotizacionData = { estatus: "Aprobada" };

  // Actualizar el estado de la cotización
  this.cotizacionService.update(id, cotizacionData).subscribe({
    next: (res) => {
      console.log(res);

      // Obtener detalles de la cotización aprobada
      this.cotizacionService.get(id).subscribe({
        next: (cotizacion) => {
          // Obtener detalles del servicio asociado a la cotización
          this.citaService.get(cotizacion.idservicio).subscribe({
            next: (servicio) => {
              // Obtener la bitácora asociada al servicio
              this.bitacoraService.getAll().subscribe({
                next: (bitacoras) => {
                  // Filtrar la bitácora para obtener la entrada asociada a la cita
                  const bitacoraCita = bitacoras.find(bitacora => bitacora.idCita === servicio.id);

                  // Si se encuentra la entrada en la bitácora
                  if (bitacoraCita) {
                    const bitacoraData = { cotizacionAuto: 1 };

                    // Actualizar la entrada en la bitácora
                    this.bitacoraService.update(bitacoraCita.id, bitacoraData).subscribe({
                      next: (bitacoraRes) => {
                        console.log(bitacoraRes);
                      },
                      error: (bitacoraError) => console.error(bitacoraError)
                    });
                  } else {
                    console.error('No se encontró la entrada de bitácora asociada a la cita.');
                  }
                },
                error: (bitacorasError) => console.error(bitacorasError)
              });
            },
            error: (servicioError) => console.error(servicioError)
          });
        },
        error: (cotizacionError) => console.error(cotizacionError)
      });
    },
    error: (cotizacionUpdateError) => console.error(cotizacionUpdateError)
  });


    

    if (this.showAdminBoard) {
      this.getCotizaciones();
    }
    if (this.showClientBoard) {
      this.misCotizaciones();
    }
  }

  rechazarCot(id:any){
    const data = {
      estatus: "Rechazada"
    }
    this.cotizacionService.update(id, data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
    if (this.showAdminBoard) {
      this.getCotizaciones();
    }
    if (this.showClientBoard) {
      this.misCotizaciones();
    }
  }


}