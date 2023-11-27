import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DirectorioComponent } from './directorio/directorio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CitasComponent } from './citas/citas.component';
import { HomeComponent } from './home/home.component';
import { CotizacionesClienteComponent } from './cotizaciones-cliente/cotizaciones-cliente.component';
import { ProfileComponent } from './profile/profile.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { OfertaServicioComponent } from './oferta-servicio/oferta-servicio.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { DirectorioDetailsComponent } from './directorio-details/directorio-details.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CotizacionVistaComponent } from './cotizacion-vista/cotizacion-vista.component';
import { DirectorioCapturaComponent } from './directorio-captura/directorio-captura.component';
import { DetallesComponent } from './detalles/detalles.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detalles', component: DetallesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'bitacora/:id', component: BitacoraComponent},
  { path: 'directorio', component: DirectorioComponent },
  { path: 'directorio/Crear', component: DirectorioCapturaComponent},
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'oferta', component: OfertaServicioComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'cotizacion/:id', component: CotizacionesClienteComponent },
  { path: 'cotizaciones', component: CotizacionComponent },
  { path: 'cotizaciones/Crear', component: CotizacionVistaComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'directorio/:id', component: DirectorioDetailsComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
