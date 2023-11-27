import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Cotizacion } from '../models/cotizacion';
import { Cita } from '../models/cita';
import { CotizacionService } from '../_services/cotizacion.service';
import { CitaService } from '../_services/cita.service';
import { ActivatedRoute } from '@angular/router';
declare let html2pdf: any;



@Component({
  selector: 'app-cotizaciones-cliente',
  templateUrl: './cotizaciones-cliente.component.html',
  styleUrls: ['./cotizaciones-cliente.component.css']
})
export class CotizacionesClienteComponent implements OnInit {
  @Input() viewMode = false;
  cotizacion!: Cotizacion;
  servicio!: Cita;
  iva: any;
  subtotal: any;
  items: any[] = [];

  constructor(private cotizacionService: CotizacionService, private route: ActivatedRoute, private citaService: CitaService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getCotizacion(this.route.snapshot.params["id"]);
    }
  }
  calcularPrecioTotal(item: any): number {
    return item.cantidad * item.precioUnitario;
  }

  exportToPdf(): void {
    const element = document.querySelector('#Micotizacion');//id of HTML element
    const options = {
      filename: 'Cotizacion.pdf',
      margin: 10,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  }


  getCotizacion(id: any): void {
    this.cotizacionService.get(id).subscribe({
      next: (data) => {
        this.cotizacion = data;
        this.subtotal = this.cotizacion.total / 1.16;
        this.iva = this.cotizacion.total - this.subtotal;
        console.log(this.cotizacion);

        this.citaService.get(this.cotizacion.idservicio).subscribe({
          next: (aux) => {
            this.servicio = aux;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
        this.items = JSON.parse(this.cotizacion.descripcion);
      },
      error: (e) => console.error(e)
    });
  }
}

