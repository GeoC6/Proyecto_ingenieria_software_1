import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { UempleadoService } from './usuario.service';
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
  selector: 'app-uempleados',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UempleadosComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: any[] = ['rut', 'nombre', 'apellido1 usuario', 'apellido2 usuario','rol'];

  constructor(private uempleadoService: UempleadoService, private router: Router) {}

  ngOnInit() {
    // Cuando se inicia el componente, obtén los usuarios del servicio
    this.uempleadoService.getUsuarios().subscribe((data: any) => {
      console.log(data)
      this.usuarios = data;
    });
  }
  
  actualizarListaDeUsuarios() {
    // Actualiza la lista de usuarios después de eliminar uno o editar
    this.uempleadoService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }
  getRolNombre(codRol: number): string {
    return codRol === 1 ? 'Administrador' : (codRol === 2 ? 'Empleado' : 'Desconocido');
  }
}

