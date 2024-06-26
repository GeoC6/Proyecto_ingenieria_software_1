import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/cliente';


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

  private apiUrl = 'http://localhost:3000/api/cliente';
  private clienteActual: Cliente | null = null;

  constructor(private http: HttpClient) { }

  createCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  updateCliente(correoCliente: string, cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${correoCliente}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  loginCliente(credentials: Credentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token && response.cliente) {
          localStorage.setItem('token', response.token);
          // console.log(response.cod_cliente)
          localStorage.setItem('cod_cliente', response.cliente.cod_cliente);

          this.setClienteActual(response.cliente);
        }
      }),
      catchError(error => {
        console.error('Error en el servicio de login:', error);
        return of(null); // Manejo de error con observables
      })
    );
  }
  getCodFromToken(): number | null {
    const cod_cliente = localStorage.getItem('cod_cliente');
    return cod_cliente ? +cod_cliente: null;
  }

  getClienteActual(): Cliente | null {
    return this.clienteActual;
  }

  setClienteActual(cliente: any) {
    const nuevoCliente: Cliente = {
      correo_cliente: cliente.CORREO_CLIENTE,
      contrasena: cliente.CONTRASENA,
      celular_cliente: cliente.CELULAR_CLIENTE,
      nombre_cliente: cliente.NOMBRE_CLIENTE,
      apellido_cliente: cliente.APELLIDO_CLIENTE,
      direccion_cliente: cliente.DIRECCION_CLIENTE
    };
    this.clienteActual = nuevoCliente;
  }
}
