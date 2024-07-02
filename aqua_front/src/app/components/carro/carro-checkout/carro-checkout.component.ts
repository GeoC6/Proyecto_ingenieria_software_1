import { Component, OnInit } from '@angular/core'
import { CarroService } from 'src/app/services/carro.service'

@Component({
  selector: 'app-carro-checkout',
  templateUrl: './carro-checkout.component.html',
  styleUrls: ['./carro-checkout.component.css'],
})
export class CarroCheckoutComponent implements OnInit {
  carro: any = []
  total: number = 0
  cod_cliente: number | null = null;

  constructor(private carroService: CarroService) {}

  ngOnInit(): void {
    this.carro = this.carroService.getCarro()
    this.total = this.carroService.getTotal()
    this.cod_cliente = JSON.parse(localStorage.getItem('cod_cliente') || 'null');
  }

  onInitCheckout(): void {
    this.carroService
      .initCheckout({
        returnUrl: 'http://localhost:3000/webpay/response',
        amount: this.total,
        cod_cliente: this.cod_cliente,
      })
      .subscribe(
        (data) => {
          window.location.href = `${data.url}?token_ws=${data.token}`
        },
        (error) => {
          console.error(error)
        }
      )
  }
}
