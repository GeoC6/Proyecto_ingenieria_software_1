import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class HistorialService {
    private apiUrl = 'http://localhost:3000/api/reserva'; // ajusta la URL según tu configuración
  
    constructor(private http: HttpClient) {}

    getReservas(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/list`);
    }
    getReserva(cod_reserva: any): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${cod_reserva}`);
    }

    updateReserva(cod_reserva: number, estado: string): Observable<any> {
      const url = `${this.apiUrl}/${cod_reserva}`;
  
      return this.http.put(url, { ESTADO: estado });
    }
    
    getMasVendido(fechaInicio: string, fechaFinal: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/reporte/masvendido`, { fecha_inicio: fechaInicio, fecha_final: fechaFinal });
    }

     // Método para obtener el reporte de ventas por mes
     getVentaPorMes(anoReporte: string): Observable<any> {
      const body = { ano_reporte: anoReporte };
    
      return this.http.post<any>(`${this.apiUrl}/reporte/ventaspormes`, body);
    }
    getDiaMasVendido(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/reporte/diamasvendido`);
    }

    getReservasByEstado(estado: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/estado/${estado}`);
    }
  
    getReservasByCiudad(ciudad: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/ciudad/${ciudad}`);
    }
    
  
    // Otros métodos relacionados con el historial...
  }
