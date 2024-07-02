import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CarroService } from 'src/app/services/carro.service'

@Component({
  selector: 'app-carro-response',
  templateUrl: './carro-response.component.html',
  styleUrls: ['./carro-response.component.css'],
})
export class CarroResponseComponent implements OnInit {
  data: any = []
  getStatus: boolean = false

  constructor(
    private route: ActivatedRoute,
    private carroService: CarroService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const status = params['status']
      const order = params['order']

      if (order) {
        this.getStatus = true
        this.carroService.getTransaction(order).subscribe(
          (data) => {
            this.getStatus = true
            this.data = data
            this.carroService.clearCarro()
          },
          (error) => {
            console.error(error)
          }
        )
      }
    })
  }
}
