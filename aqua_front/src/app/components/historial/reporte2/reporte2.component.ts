import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  resultadoVentasPorMes: any;
  errorObtenerVentasPorMes: any;
  mensajeSinDatos: string = '';

  // Nueva propiedad para almacenar los datos de la tabla
  datosTablaVentasPorMes: any[] = [];

  anoReporte: string = '2023'; // Cambia esto a tu valor por defecto

  // Variable booleana para mostrar/ocultar la tabla
  mostrarDatos: boolean = false;

  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    this.obtenerVentasPorMes();
  }

  obtenerVentasPorMes() {
    this.historialService.getVentaPorMes(this.anoReporte).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);

        // Verificar si hay datos disponibles
        if (data && data.length > 0) {
          this.resultadoVentasPorMes = data;
          this.datosTablaVentasPorMes = data;
          this.mensajeSinDatos = '';
        } else {
          this.resultadoVentasPorMes = null;
          this.datosTablaVentasPorMes = [];
          this.mensajeSinDatos = 'No hay datos disponibles para el año especificado.';
        }

        // Actualizar la variable para mostrar/ocultar la tabla
        this.mostrarDatos = true;
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);

        // Extraer el mensaje específico del error
        const mensajeError = error?.error?.msg || 'Error al obtener el reporte. Por favor, intenta de nuevo más tarde.';

        // Limpiar el resultado en caso de error
        this.resultadoVentasPorMes = null;
        this.datosTablaVentasPorMes = [];
        this.mensajeSinDatos = mensajeError;

        // Actualizar la variable para mostrar/ocultar la tabla
        this.mostrarDatos = true;
      }
    );
  }
}