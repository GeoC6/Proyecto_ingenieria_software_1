import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definición de la interfaz Cliente
export interface Cliente {
  correo_cliente: string;
  contrasena: string;
  celular_cliente: string;
  nombre_cliente: string;
  apellido_cliente: string;
  direccion_cliente: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3000/api/cliente'; // Ajustar la URL según sea necesario

  constructor(private http: HttpClient) { }

  createCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  updateCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  loginCliente(credentials: { correo_cliente: string, celular_cliente: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login-cliente`, credentials);
  }
}
