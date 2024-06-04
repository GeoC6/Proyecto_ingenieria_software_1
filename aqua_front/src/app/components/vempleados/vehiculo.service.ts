import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VempleadoService {
  private apiUrl = 'http://localhost:3000/api/vehiculos'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getVehiculos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }
  getVehiculo(patente_cod_vehiculo: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${patente_cod_vehiculo}`);
  }
  deleteVehiculo(patente_cod_vehiculo: any): Observable<any> {
    const url = `${this.apiUrl}/${patente_cod_vehiculo}`;
    return this.http.delete<any>(url);
  }
  

  // Agrega otros métodos según tus necesidades, como crear, actualizar o eliminar usuarios
}
