import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Modulos
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioService } from './components/usuarios/usuario.service';
import { InventarioIndexComponent } from './components/inventario/index/index.component';
import { UsuariosEditComponent } from './components/usuarios/edit/edit.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { SignInVehiculoComponent } from './sign-in-vehiculo/sign-in-vehiculo.component';
import { EditVehiculoComponent } from './components/vehiculo/edit-vehiculo/edit-vehiculo.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { UempleadosComponent } from './components/uempleados/usuarios.component';
import { VempleadosComponent } from './components/vempleados/vehiculo.component';
import { ReservaService } from './services/reserva.service';
import { FormsModule } from '@angular/forms';
import { ReservaModule } from './components/reserva/reserva.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { InventarioCreateComponent } from './components/inventario/create/create.component';
import { InventarioEditComponent } from './components/inventario/edit/edit.component';
import { HistorialComponent } from './components/historial/historial.component';
import { Reporte1Component } from './components/historial/reporte1/reporte1.component';
import { Reporte2Component } from './components/historial/reporte2/reporte2.component';
import { Reporte3Component } from './components/historial/reporte3/reporte3.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    SpinnerComponent,
    InicioComponent,
    NavigatorComponent,
    UsuariosComponent,
    InventarioIndexComponent,
    UsuariosEditComponent,
    VehiculoComponent,
    SignInVehiculoComponent,
    EditVehiculoComponent,
    AdminComponent,
    EmpleadoComponent,
    UempleadosComponent,
    VempleadosComponent,
    ReservaComponent,
    InventarioCreateComponent,
    InventarioEditComponent,
    HistorialComponent,
    Reporte1Component,
    Reporte2Component,
    Reporte3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReservaModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, // ToastrModule added
  ],
  providers: [UsuarioService, ReservaService,
   // { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
