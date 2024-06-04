import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosEditComponent } from './components/usuarios/edit/edit.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { SignInVehiculoComponent } from './sign-in-vehiculo/sign-in-vehiculo.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { UempleadosComponent } from './components/uempleados/usuarios.component';
import { VempleadosComponent } from './components/vempleados/vehiculo.component';
import { InventarioCreateComponent } from './components/inventario/create/create.component';
import { InventarioEditComponent } from './components/inventario/edit/edit.component';
import { HistorialComponent } from './components/historial/historial.component';
import { Reporte1Component } from './components/historial/reporte1/reporte1.component'; // Asegúrate de importar Reporte1Component
import { Reporte2Component } from './components/historial/reporte2/reporte2.component';
import { Reporte3Component } from './components/historial/reporte3/reporte3.component';

//Guard

import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navigator', component: NavigatorComponent },
  { path: 'usuarios', component: UsuariosComponent,canActivate: [AuthGuard]},
  { path: 'usuarios/edit/:id', component: UsuariosEditComponent,canActivate: [AuthGuard] },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'productos', component: ProductosComponent,canActivate: [AuthGuard] },
  { path: 'reserva', component: ReservaComponent },
  { path: 'vehiculo', component: VehiculoComponent,canActivate: [AuthGuard] },
  { path: 'sing-in-vehiculo', component: SignInVehiculoComponent,canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard]},
  { path: 'empleado', component: EmpleadoComponent,canActivate: [AuthGuard]},
  { path: 'uempleados', component: UempleadosComponent,canActivate: [AuthGuard]},
  { path: 'vempleados', component: VempleadosComponent,canActivate: [AuthGuard]},
  { path: 'inventario/create', component: InventarioCreateComponent,canActivate: [AuthGuard]},
  { path: 'inventario/edit/:id', component: InventarioEditComponent,canActivate: [AuthGuard]},
  { path: 'historial', component: HistorialComponent,canActivate: [AuthGuard] },
  { path: 'reporte1', component: Reporte1Component,canActivate: [AuthGuard] },
  { path: 'reporte2', component: Reporte2Component,canActivate: [AuthGuard] },
  { path: 'reporte3', component: Reporte3Component,canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
