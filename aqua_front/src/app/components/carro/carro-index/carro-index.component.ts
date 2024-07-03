import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CarroService } from 'src/app/services/carro.service'

@Component({
  selector: 'app-carro-index',
  templateUrl: './carro-index.component.html',
  styleUrls: ['./carro-index.component.css'],
})
export class CarroIndexComponent implements OnInit {
  constructor(private carroService: CarroService, private router: Router) {}

  data: any = []
  carro: any = []
  total: number = 0

  ngOnInit(): void {
    this.carroService.getProducts().subscribe(
      (data) => {
        this.data = data
        console.log(data)
      },
      (error) => {
        console.error(error)
      }
    )
    this.getCarro()
  }
  irAPerfil() {
    this.router.navigate(['/loginCliente2']);
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio'])
}


  addCarro(id: number) {
    const index = this.data.find(
      (item: { COD_PRODUCTO: number }) => item.COD_PRODUCTO == id
    )
    this.carroService.addCarro(index)
    this.getCarro()
  }

  getCarro() {
    this.carro = this.carroService.getCarro()
    this.total = this.carroService.getTotal()
  }

  removeCarro(id: number) {
    const filtro = this.carro.filter(
      (item: { COD_PRODUCTO: number }) => item.COD_PRODUCTO != id
    )
    this.carroService.removeCarro(filtro)
    this.getCarro()
  }

  getTotal() {
    const total = this.carroService.getTotal()
    this.total = total
  }
}
