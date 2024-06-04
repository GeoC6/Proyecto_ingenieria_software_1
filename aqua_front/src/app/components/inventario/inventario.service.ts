import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = 'http://localhost:3000/api/productos'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getInventario() {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }
  removeInventario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  createInventario(inventario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, inventario);
   }

   editInventario(inventario: any): Observable<any> {
    const editUrl = `${this.apiUrl}/${inventario.cod_producto}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.put(editUrl, inventario); // Realiza una solicitud PUT al servidor
  }

  obtenerInventario(inventario: any): Observable<any> {
    const editUrl = `${this.apiUrl}/${inventario}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.get<any[]>(editUrl); // Realiza una solicitud PUT al servidor
  }
}
