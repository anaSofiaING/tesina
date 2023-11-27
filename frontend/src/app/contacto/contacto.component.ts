
import { AfterViewInit, Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { EmailContactoService } from '../_services/email-contacto.service';
import * as L from 'leaflet';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements AfterViewInit {
  
    map: any;
  
    constructor(public emailService: EmailContactoService, private router: Router) {
    }
  
    public ngAfterViewInit(): void {
      this.loadMap();
    }
  
    private loadMap(): void {
      this.map = L.map('map').setView([21.891488, -102.272249], 20);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.mapbox.accessToken,
      }).addTo(this.map);
  
      
      this.map.flyTo([21.891488, -102.272249], 20);
  
      const icon = L.icon({
        iconUrl: 'assets/map/marker-icon.png',
        shadowUrl: 'assets/map/marker-shadow.png',
        popupAnchor: [13, 0],
      });

      const marker = L.marker([21.891488, -102.272249], { icon }).bindPopup('AAA');
      marker.addTo(this.map);
    }

    enviar(form:any){
      this.emailService.sendMessage(form).subscribe(() => {
       console.log("Se envió el correo");
        });
        const rutaActual = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([rutaActual]);
        });
    }
  
  }