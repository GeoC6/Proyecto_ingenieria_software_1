import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {VehiculoService} from './vehiculo.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@NgModule({
  declarations: [
    // Declaraciones de componentes
  ],
  imports: [
    MatTableModule,MatButtonModule, MatDividerModule, MatIconModule,
    // Otros módulos de Angular Material que estés utilizando
  ],
  providers: [
    // Servicios y otros proveedores
  ]
})
export class UsuariosModule { }

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  vehiculo: any[] = [];
  displayedColumns: any[] = ['patente_cod_vehiculo', 'marca', 'modelo', 'color', 'ano','acciones'];

  constructor(private vehiculoService: VehiculoService, private router: Router) {}

  ngOnInit() {
    // Cuando se inicia el componente, obtén los usuarios del servicio
    this.vehiculoService.getVehiculos().subscribe((data: any) => {
      console.log(data)
      this.vehiculo = data;
    });
  }

  // Método para editar un usuario
  editarVehiculo(vehiculo: any) {
    // Aquí puedes implementar la lógica para editar un usuario
    this.router.navigate(['vehiculo/edit-vehiculo',vehiculo]);
  }

  // Método para eliminar un usuario
  eliminarVehiculo(patente_cod_vehiculo: any) {
    if (confirm('¿Seguro que deseas eliminar este vehiculo?')) {
      this.vehiculoService.deleteVehiculo(patente_cod_vehiculo).subscribe(() => {
        console.log('Vehiculo eliminado exitosamente');
        this.actualizarListaDeVehiculo();
      },
      (error) => {
        console.error('Error al eliminar el vehiculo:', error);
      });
    }
  }
  actualizarListaDeVehiculo() {
    // Actualiza la lista de usuarios después de eliminar uno o editar
    this.vehiculoService.getVehiculos().subscribe((data: any) => {
      this.vehiculo = data;
    });
  }
  redirectToSignInVehiculos() {
    // Redirige a la página de registro (reemplaza 'nombre-de-ruta' con la ruta real)
    this.router.navigate(['/sing-in-vehiculo']);
  }
}

