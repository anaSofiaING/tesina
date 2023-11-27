import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  mensaje?: string;
  user?: any;
  contrasena?: string;
  hecho:boolean=true;
  contrasenaConf?:string;
  isLoggedIn = false;
  constructor(
    private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.user = this.storageService.getUser();
    }

  }

  reset():void{
    this.hecho=true;
    this.mensaje="";
  }
  modificarContrasena(): void {
    if (this.contrasena === this.contrasenaConf) {

      const data = {
        password: this.contrasena
      }
      this.authService.update(this.user.id, data).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
      this.mensaje="Cambio exitoso!";
      this.hecho=false;
      this.contrasena="";
      this.contrasenaConf="";
    }
    else{
      this.mensaje="No coinciden las contraseñas";
    }

  }
}
