import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/list`);
  }

  realizarPedido(cliente: Cliente, pedidoInfo: PedidoInfo): Observable<any> {
    const url = `${this.apiUrl}/reserva`;
    console.log('Datos enviados al backend:', { cliente, pedidoInfo });

    // Aquí es donde se agregan COD_PRODUCTO y CANTIDAD al cuerpo de la solicitud
    const body = {
      apellido_cliente: cliente.apellido_cliente,
      nombre_cliente: cliente.nombre_cliente,
      celular_cliente: cliente.celular_cliente,
      direccion_cliente: cliente.direccion_cliente,
      ciudad_cliente: cliente.ciudad_cliente,
      COD_PRODUCTO: pedidoInfo.productos.map((producto: any) => producto.COD_PRODUCTO),
      CANTIDAD: pedidoInfo.productos.map((producto: any) => producto.cantidadPedido),
    };


    return this.http.post<any[]>(url, body).pipe(
      tap((response) => {

        const result = response

        console.log(result[0])
        // Resto del código
      })
    );
  }

  getInformacionReserva(cod_reserva: number): Observable<Blob> {
    const pdfUrl = `${this.apiUrl}/reserva/generarpdf/${cod_reserva}`; // Ajusta la URL según tu API
    window.open(pdfUrl);
    return this.http.get(pdfUrl, { responseType: 'blob' });
  }
  
}

export interface Cliente {
  nombre_cliente: string;
  apellido_cliente: string;
  celular_cliente: string;
  direccion_cliente: string;
  ciudad_cliente: string;
}

export interface PedidoInfo {
  productos: any[];
  nombrePersona: string;
  apellidoPersona: string;
  direccionPersona: string;
  ciudadCliente: string;
}