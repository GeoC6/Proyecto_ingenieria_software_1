import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-webpay-return',
  template: '<p>Procesando pago...</p>',
})
export class WebpayReturnComponent implements OnInit {
  constructor(private route: ActivatedRoute, private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token_ws = params['token_ws'];
      if (token_ws) {
        this.reservaService.commitTransaction(token_ws).subscribe({
          next: (response) => {
            console.log('Transacción completada:', response);
            // Handle successful transaction (e.g., redirect to confirmation page)
          },
          error: (error) => {
            console.error('Error al completar la transacción:', error);
            // Handle transaction failure
          }
        });
      }
    });
  }
}
