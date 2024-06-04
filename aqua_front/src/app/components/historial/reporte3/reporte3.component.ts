import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {

  resultadoDiaMasVendido: any;
  errorObtenerDiaMasVendido: any;
  mensajeSinDatos: string = '';

  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    this.obtenerDiaMasVendido();
  }

  obtenerDiaMasVendido() {
    this.historialService.getDiaMasVendido().subscribe(
      (data) => {
        if (data) {
          this.resultadoDiaMasVendido = data;
          this.mensajeSinDatos = '';
        } else {
          this.resultadoDiaMasVendido = null;
          this.mensajeSinDatos = 'No hay datos disponibles para el día más vendido.';
        }
      },
      (error) => {
        console.error('Error al obtener el reporte:', error);
        const mensajeError =
          error?.error?.msg ||
          'Error al obtener el reporte. Por favor, intenta de nuevo más tarde.';

        this.resultadoDiaMasVendido = null;
        this.mensajeSinDatos = mensajeError;
      }
    );
  }
}
