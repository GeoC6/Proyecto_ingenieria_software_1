import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/cliente';


export interface Cliente {
  cod_cliente: number;
  correo_cliente: string;
  contrasena: string;
  celular_cliente: string;
  nombre_cliente: string;
  apellido_cliente: string;
  direccion_cliente: string;
}

export interface Boleta {
  COD_BOLETA: number;
  COD_CLIENTE: number;
  COD_PAGO: number;
  TRANSACTION_DATE: string;
  AMOUNT: number;
  STATUS: string;
  pagos: {
    BUY_ORDER: string;
    AMOUNT: number;
  };
  Cliente: {
    NOMBRE: string;
    APELLIDO: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3000/api';
  private clienteActual: Cliente | null = null;
  cod_cliente: number | null = null ;

  constructor(private http: HttpClient) { }

  createCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cliente`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cliente/${id}`);
  }

  loginCliente(credentials: Credentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cliente/login`, credentials).pipe(
      tap(response => {
        if (response.token && response.cliente) {


          localStorage.setItem('token', response.token);
          // console.log(response.cod_cliente)
          localStorage.setItem('cod_cliente', response.cliente.COD_CLIENTE);

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
    return cod_cliente ? JSON.parse(cod_cliente) : null;
  }

  getClienteActual(): Cliente | null {
    if (!this.clienteActual) {
      const clienteActual = localStorage.getItem('clienteActual');
      
      if (clienteActual) {
        this.clienteActual = JSON.parse(clienteActual);
      }
    }
    return this.clienteActual;
  }
  
  updateCliente(cod_cliente: string | number, cliente: Partial<Cliente>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cliente/${cod_cliente}`, cliente).pipe(
      tap(response => {
        // Actualiza clienteActual solo si la respuesta del servidor contiene datos del cliente actualizado
        if (response && response.cliente) {
          this.setClienteActual(response.cliente);
        }
      }),
      catchError(error => {
        console.error('Error en el servicio de actualización:', error);
        return of(null); // Devolver un observable con valor null en caso de error
      })
    );
  }

  setClienteActual(cliente: any) {
    const nuevoCliente: Cliente = {
      correo_cliente: cliente.CORREO_CLIENTE,
      contrasena: cliente.CONTRASENA,
      celular_cliente: cliente.CELULAR_CLIENTE,
      nombre_cliente: cliente.NOMBRE_CLIENTE,
      apellido_cliente: cliente.APELLIDO_CLIENTE,
      direccion_cliente: cliente.DIRECCION_CLIENTE,
      cod_cliente: cliente.COD_CLIENTE
    };
    this.clienteActual = nuevoCliente;
  }

  getBoletasByCliente(cod_cliente: number): Observable<Boleta[]> {
    return this.http.get<Boleta[]>(`${this.apiUrl}/boletas/cliente/${cod_cliente}`).pipe(
      catchError(error => {
        console.error('Error al obtener las boletas del cliente:', error);
        return of([]);
      })
    );
  }
}