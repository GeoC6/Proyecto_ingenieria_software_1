import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { HistorialService } from 'src/app/services/historial.service';
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
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  reserva: any[] = [];
  displayedColumns: any[] = ['cod_reserva','fecha_creacion' ,'nombre_cliente','ciudad_cliente','total','estado'];

  filtroSeleccionado: string = 'estado';
  selectedEstado: string = '';
  selectedCiudad: string = '';

  constructor(private historialService: HistorialService, private router: Router) { }

  ngOnInit(): void {
    this.historialService.getReservas().subscribe((data: any) => {
      console.log(data)
      this.reserva = data;
    });
  }

  opcionesEstado: string[] = ['Pendiente', 'Confirmada', 'Cancelada']; // Agrega los estados necesarios
  opcionesCiudad: string[] = ['','Rancagua', 'Requinoa'];
  cambiarEstadoReserva(reserva: any, nuevoEstado: string): void {
    // Configurar el estado de la reserva como cambiando para deshabilitar el desplegable y mostrar un mensaje
    reserva.cambiandoEstado = true;

    this.historialService.updateReserva(reserva.COD_RESERVA, nuevoEstado).subscribe(
      (response) => {
        console.log('Estado de la reserva cambiado con éxito:', response);
        // Actualizar el estado en el objeto reserva
        reserva.ESTADO = nuevoEstado;
        // Reiniciar el nuevo estado y deshabilitar la bandera de cambio de estado
        reserva.nuevoEstado = '';
        reserva.cambiandoEstado = false;
      },
      (error) => {
        console.error('Error al cambiar el estado de la reserva:', error);
        // Manejar el error según tus necesidades
        // Reiniciar el nuevo estado y deshabilitar la bandera de cambio de estado
        reserva.nuevoEstado = '';
        reserva.cambiandoEstado = false;
      }
    );
  }

  filtrarReservas(): void {
    if (this.selectedEstado) {
      // Si se selecciona un estado, filtrar por estado
      this.historialService.getReservasByEstado(this.selectedEstado).subscribe((data: any) => {
        this.reserva = data;
      });
    } else if (this.selectedCiudad) {
      // Si se selecciona una ciudad, filtrar por ciudad
      this.historialService.getReservasByCiudad(this.selectedCiudad).subscribe((data: any) => {
        this.reserva = data;
      });
    } else {
      // Si no se selecciona ni estado ni ciudad, obtener todas las reservas
      this.historialService.getReservas().subscribe((data: any) => {
        this.reserva = data;
      });
    }
  }


  redirectReporte1() {
    // Redirige a la página de registro (reemplaza 'nombre-de-ruta' con la ruta real)
    this.router.navigate(['reporte1']);
  
  }

  redirectReporte2() {
    // Redirige a la página de registro (reemplaza 'nombre-de-ruta' con la ruta real)
    this.router.navigate(['reporte2']);
  
  }

  redirectReporte3() {
    // Redirige a la página de registro (reemplaza 'nombre-de-ruta' con la ruta real)
    this.router.navigate(['reporte3']);
  
  }


  
}
