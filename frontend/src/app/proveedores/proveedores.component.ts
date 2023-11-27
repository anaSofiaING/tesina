import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../_services/proveedor.service';
import { Proveedor } from '../models/proveedor';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

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
  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;


  proveedores: Proveedor[] = [];
  constructor(private proveedorService: ProveedorService,private router: Router,private storageService:StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
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
