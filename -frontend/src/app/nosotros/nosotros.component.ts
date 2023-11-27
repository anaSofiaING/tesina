import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  titulo: string = 'Misión';
  descripcion: string = 'Satisfacer las necesidades de mantenimiento automotriz, a través de diferentes servicios que se acoplen a las necesidades del cliente y del vehiculo.';
  imagenUrl: string = '/assets/misionimg.png';

  constructor() { }

  ngOnInit(): void {
  }

  cambiarContenido(nuevoTitulo: string, nuevaDescripcion: string, nuevaImagenUrl: string) {
    this.titulo = nuevoTitulo;
    this.descripcion = nuevaDescripcion;
    this.imagenUrl = nuevaImagenUrl;
  }


}
