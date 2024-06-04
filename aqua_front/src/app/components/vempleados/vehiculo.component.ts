import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {VempleadoService} from './vehiculo.service';
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
  selector: 'app-vempleados',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VempleadosComponent implements OnInit {

  vehiculo: any[] = [];
  displayedColumns: any[] = ['patente_cod_vehiculo', 'marca', 'modelo', 'color', 'ano','acciones'];

  constructor(private vempleadoService: VempleadoService, private router: Router) {}

  ngOnInit() {
    // Cuando se inicia el componente, obtén los usuarios del servicio
    this.vempleadoService.getVehiculos().subscribe((data: any) => {
      console.log(data)
      this.vehiculo = data;
    });
  }

  actualizarListaDeVehiculo() {
    // Actualiza la lista de usuarios después de eliminar uno o editar
    this.vempleadoService.getVehiculos().subscribe((data: any) => {
      this.vehiculo = data;
    });
  }
}

