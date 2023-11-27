import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../_services/proveedor.service';
import { Proveedor } from '../models/proveedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  nuevo:Proveedor={
    id: 0,
    nombre: '',
    telefono1: '',
    ext1: '',
    telefono2: '',
    ext2: '',
    celular1: '',
    celular2: '',
    direccion: '',
    notas: ''
  }

  proveedores: Proveedor[] = [];
  constructor(private proveedorService: ProveedorService,private router: Router) { }

  ngOnInit(): void {
    this.iniciarDatos();
  }

  guardarDatos(){
    this.proveedorService.create(this.nuevo)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/proveedores']);
      });

  }

  
  iniciarDatos(){
    this.proveedorService.getAll().subscribe({
      next: (data) => {
        this.proveedores=data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

}
