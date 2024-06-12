//reserva.component.ts


import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { Cliente, PedidoInfo } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  productos: any[] = [];
  displayedColumns: any[] = ['SELECCIONAR', 'NOMBRE_PRODUCTO', 'PRECIO_PRODUCTO', 'CANTIDAD_PEDIDO'];
  cantidades: number[] = [0, 1, 2, 3, 4, 5];
  nombreCliente: string = '';
  apellidoCliente: string = '';
  celularCliente: string = '';
  direccionCliente: string = '';
  ciudadCliente: string = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getProductos().subscribe((data) => {
      this.productos = data.map((producto) => ({
        ...producto,
        cantidadPedido: 0,
        seleccionado: false,
      }));
    });
  }

  resetCantidad(element: any): void {
    element.cantidadPedido = 0;
  }

  realizarPedido(): void {
    if (this.productos.some((producto) => producto.seleccionado && producto.cantidadPedido === 0)) {
      alert('La cantidad debe ser mayor que 0 para los productos seleccionados.');
      return;
    }
    if (!this.nombreCliente || !this.apellidoCliente || !this.celularCliente || !this.direccionCliente || !this.ciudadCliente) {
      alert('Todos los campos del cliente son obligatorios.');
      return;
    }
  
    const productosSeleccionados = this.productos.filter((producto) => producto.seleccionado);
  
    if (productosSeleccionados.length > 0) {
      const pedidoInfo = {
        productos: productosSeleccionados,
        nombrePersona: this.nombreCliente,
        apellidoPersona: this.apellidoCliente,
        direccionPersona: this.direccionCliente,
        ciudadCliente: this.ciudadCliente,
      };
  
      this.reservaService
        .realizarPedido(
          {
            nombre_cliente: this.nombreCliente,
            apellido_cliente: this.apellidoCliente,
            celular_cliente: this.celularCliente,
            direccion_cliente: this.direccionCliente,
            ciudad_cliente: this.ciudadCliente,
          },
          pedidoInfo
        )
        .subscribe({
          next: (response) => {
            console.log('Pedido realizado con éxito:', response);
  
            const cod_reserva = response.reserva.COD_RESERVA;
  
            // Iniciar la transacción de WebPay
            this.iniciarTransaccionWebPay(cod_reserva, pedidoInfo);
          },
          error: (error: any) => {
            console.log('Error al realizar el pedido:', error);
          },
        });
    }
  }

  iniciarTransaccionWebPay(cod_reserva: number, pedidoInfo: PedidoInfo): void {
    // Datos necesarios para la transacción de WebPay
    const webpayData = {
      buyOrder: `ORDER_${cod_reserva}`,
      sessionId: `SESSION_${cod_reserva}`,
      amount: pedidoInfo.productos.reduce((total, producto) => total + producto.PRECIO_PRODUCTO * producto.cantidadPedido, 0),
      returnUrl: 'http://localhost:4200/webpay-return'
    };

    // Crear la transacción de WebPay
    this.reservaService.createTransaction(webpayData).subscribe({
      next: (webpayResponse) => {
        // Redireccionar al usuario a la página de WebPay
        window.location.href = webpayResponse.url + '?token_ws=' + webpayResponse.token;

        // Descargar el PDF después de completar la transacción de WebPay
        this.descargarPDF(cod_reserva);
      },
      error: (error) => {
        console.error('Error al iniciar la transacción de WebPay:', error);
      }
    });
  }

  descargarPDF(cod_reserva: number): void {
    // Obtener el PDF después de completar la transacción de WebPay
    this.reservaService.getInformacionReserva(cod_reserva).subscribe({
      next: (informacionReserva) => {
        console.log('Información adicional de la reserva:', informacionReserva);
      },
      error: (errorGetReserva) => {
        console.error('Error al obtener información adicional de la reserva:', errorGetReserva);
      }
    });
  }
}
