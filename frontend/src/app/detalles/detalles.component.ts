import { Component, OnInit } from '@angular/core';
import { CitaService } from '../_services/cita.service';
import { ClienteService } from '../_services/cliente.service';
import { Chart, ChartType } from 'chart.js/auto';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  tServicios: number = 0;//total de servicios
  tActivos: number = 0;//total de servicios vigentes
  tClientes: number = 0; //total de clientes
  public chart!: Chart; //grafica comparativa de 2022 y 2023
  public chartServicios!: Chart; //grafica comparativa de 2022 y 2023 en servicios
  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;

  constructor(private citaService: CitaService,private router:Router, private clienteService: ClienteService, private storageService:StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }else{
        this.router.navigate(['/home']);
    }
    this.getServicios();
    this.getClientes();
    this.graficaVentas();
    this.graficaServicios();
  }
  graficaServicios() {
     // datos grafica 2
     const data1 = {
      labels: ['Ene', 'Feb', 'Mar', 'Abril', 'May', 'Junio', 'Julio', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets:
        [
          {
            label: 'Servicios 2023',
            data: [32, 40, 45, 45, 43, 60, 70,25,35,55,45,45],
            lineTension: 0,
            fill: false,
            borderColor: 'red'
          },
          {
            label: 'Servicios 2022',
            data:  [32, 50, 55, 55, 53, 70, 60,55,55,55,45,45],
            lineTension: 0,
            fill: false,
            borderColor: 'blue'
          }
        ]
    };
    // Creamos la gráfica
    this.chartServicios = new Chart("chartServicios", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: data1 // datos 
    });
  }
  graficaVentas() {
    // datos grafica 1
    const data = {
      labels: ['Ene', 'Feb', 'Mar', 'Abril', 'May', 'Junio', 'Julio', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets:
        [
          {
            label: 'Ventas 2023',
            data:  [70, 90, 85, 85, 83, 80, 70,65,65,55,45,45],
            lineTension: 0,
            fill: false,
            borderColor: 'green'
          },
          {
            label: 'Ventas 2022',
            data:  [132, 80, 85, 85, 73, 60, 70,25,35,55,45,45],
            lineTension: 0,
            fill: false,
            borderColor: 'red'
          }
        ]
    };
    // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: data // datos 
    });
  }
  getClientes() {
    this.clienteService.getAll().subscribe({
      next: (data) => {
        this.tClientes = data.length;
      },
      error: (e) => { console.error(e); }
    });
  }

  getServicios(): void {
    this.citaService.getAll().subscribe({
      next: (data) => {
        this.tServicios = data.length;
        for (let i = 0; i < data.length; i++) {
          if (data[i].vigente=="Activo")
            this.tActivos++;
        }
      },
      error: (e) => { console.error(e); }
    });
  }

}
