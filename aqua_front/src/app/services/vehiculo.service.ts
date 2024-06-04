import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/vehiculos'
   }

   signInVehiculo(vehiculo: Vehiculo): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, vehiculo);
   }

   navigator(vehiculo: Vehiculo): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, vehiculo);
   }
   editarVehiculo(vehiculo: any): Observable<any> {
    const editUrl = `${this.myAppUrl}${this.myApiUrl}/${vehiculo.patente_cod_vehiculo}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.put(editUrl, vehiculo); // Realiza una solicitud PUT al servidor
  }
  obtenerVehiculo(vehiculo: any): Observable<any> {
    const editUrl = `${this.myAppUrl}${this.myApiUrl}/${vehiculo}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.get<any[]>(editUrl); // Realiza una solicitud PUT al servidor
  }
  eliminarVehiculo(vehiculoId: number): Observable<any> {
    const deleteUrl = `${this.myAppUrl}/vehiculos/${vehiculoId}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.delete(deleteUrl); // Realiza una solicitud DELETE al servidor
    }
}

export interface Vehiculo {
    patente_cod_vehiculo: string,
}