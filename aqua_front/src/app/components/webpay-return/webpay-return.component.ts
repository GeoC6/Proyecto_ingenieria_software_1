import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-webpay-return',
  templateUrl: './webpay-return.component.html',
  styleUrls: ['./webpay-return.component.css']
})
export class WebpayReturnComponent implements OnInit {
  token: string | null = null;
  pagoExitoso: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.token  = this.route.snapshot.queryParamMap.get('token_ws');

    if(this.token != null) {
      this.confirmarTransaccion();
    }
  

    // Redirige a la página principal después de 1 minuto
    setTimeout(() => {
      this.router.navigate(['/inicio']);
    }, 60000);
  }

  
  confirmarTransaccion() {
    if (this.token) {
      this.reservaService.commitTransaction(this.token).subscribe(
        response => {
          console.log("Transacción exitosa:", response);
          this.pagoExitoso = true;
        },
        error => {
          console.log("Error en la transacción:", error);
          this.pagoExitoso = false;
        }
      );
    } else {
      console.log("No se recibió token.");
    }
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']);
  }
}
