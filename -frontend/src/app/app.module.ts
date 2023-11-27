import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ContactoComponent } from './contacto/contacto.component';
import { DirectorioComponent } from './directorio/directorio.component';
import { CitasComponent } from './citas/citas.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { DirectorioDetailsComponent } from './directorio-details/directorio-details.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { OfertaServicioComponent } from './oferta-servicio/oferta-servicio.component';
import { DirectorioCapturaComponent } from './directorio-captura/directorio-captura.component';
import { CotizacionesClienteComponent } from './cotizaciones-cliente/cotizaciones-cliente.component';
import { CotizacionVistaComponent } from './cotizacion-vista/cotizacion-vista.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { DetallesComponent } from './detalles/detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    ContactoComponent,
    DirectorioComponent,
    CitasComponent,
    ProveedoresComponent,
    BitacoraComponent,
    ServiciosComponent,
    DirectorioDetailsComponent,
    NosotrosComponent,
    OfertaServicioComponent,
    DirectorioCapturaComponent,
    CotizacionesClienteComponent,
    CotizacionVistaComponent,
    CotizacionComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
