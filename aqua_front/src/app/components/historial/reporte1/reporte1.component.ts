import { Component, OnInit } from '@angular/core';

import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit {

  resultadoMasVendido: any; // Debes declarar la propiedad resultadoMasVendido
  mensajeSinDatos: string = '';
  errorObtenerMasVendido: any; // Debes declarar la propiedad errorObtenerMasVendido

  fechaInicio: string = '2023-01-01';
  fechaFinal: string = '2023-12-31';

  // Variable booleana para mostrar/ocultar la tabla
  mostrarTabla: boolean = false;
  // Nueva propiedad para almacenar los datos de la tabla
  datosTablaMasVendido: any[] = [];


  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    this.obtenerMasVendido();
  }

  obtenerMasVendido() {
    console.log(this.fechaInicio)
    this.historialService.getMasVendido(this.fechaInicio, this.fechaFinal).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);
        // Verificar si hay datos disponibles
        if (data) {
          this.resultadoMasVendido = data;
          this.mensajeSinDatos = ''; // Limpiar el mensaje informativo si hay datos
        } else {
          this.resultadoMasVendido = null;
          this.mensajeSinDatos = 'No hay datos para el rango de fechas especificado.';
        }

        this.resultadoMasVendido = data;
        this.errorObtenerMasVendido = null;
        // Procesa la respuesta del servidor según tus necesidades

        // Procesa los datos para la tabla si es necesario
        this.procesarDatosTabla();

        // Muestra la tabla después de obtener los datos
        this.mostrarTabla = true;
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);
        this.resultadoMasVendido = null;
        this.errorObtenerMasVendido = error; // Maneja el error según tus necesidades
        this.mostrarTabla = false;
        // Maneja el error según tus necesidades
        // Extraer el mensaje específico del error
      const mensajeError = error?.error?.msg || 'Error al obtener el reporte. Por favor, intenta de nuevo más tarde.';
      
      // Limpiar el resultado en caso de error
      this.resultadoMasVendido = null;
      this.mensajeSinDatos = mensajeError;
      }
    );
  }
  // Método para procesar los datos y prepararlos para la tabla
  procesarDatosTabla() {
    // Implementa la lógica de procesamiento de datos si es necesario
    // Puedes asignar los datos a this.datosTablaMasVendido
    // Ejemplo: this.datosTablaMasVendido = this.resultadoMasVendido.map(...);
  }
}