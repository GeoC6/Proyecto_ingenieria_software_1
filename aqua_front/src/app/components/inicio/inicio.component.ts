import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private reservaService: ReservaService) { }

  
  ngOnInit(): void {
    const token_ws = this.activatedRoute.snapshot.queryParamMap.get('token_ws');
    this.validateToken()

    if(token_ws != null) {
      this.commitTransaction(token_ws);
    }
  }
 
   validateToken() {
     if (localStorage.getItem("token") === null) {
       this.router.navigate(['/login'])
     }
   }

   commitTransaction(token: string): void {

    // Crear la transacción de WebPay
    this.reservaService.commitTransaction(token).subscribe({
      next: (webpayResponse) => {
        console.log(webpayResponse);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/loginCliente'])
  }

}