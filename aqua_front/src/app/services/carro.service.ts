import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/carro/products`)
  }

  getCarro(): any {
    return JSON.parse(localStorage.getItem('carro') || '[]') || []
  }

  addCarro(data: any): any {
    const getCarro = JSON.parse(localStorage.getItem('carro') || '[]') || []
    const index = getCarro.findIndex(
      (item: { COD_PRODUCTO: number }) => item.COD_PRODUCTO == data.COD_PRODUCTO
    )
    if (index !== -1) {
      const item = getCarro[index]
      item.CANTIDAD = item.CANTIDAD + 1
      item.TOTAL = item.CANTIDAD * item.PRECIO_PRODUCTO
      localStorage.setItem('carro', JSON.stringify(getCarro))
    } else {
      const newItem = {
        COD_PRODUCTO: data.COD_PRODUCTO,
        NOMBRE_PRODUCTO: data.NOMBRE_PRODUCTO,
        PRECIO_PRODUCTO: data.PRECIO_PRODUCTO,
        CANTIDAD: 1,
        TOTAL: data.PRECIO_PRODUCTO,
      }
      const updatedCarro = [...getCarro, newItem]
      localStorage.setItem('carro', JSON.stringify(updatedCarro))
    }
  }

  removeCarro(data: any): any {
    localStorage.setItem('carro', JSON.stringify(data))
  }

  clearCarro(): any {
    localStorage.removeItem('carro')
  }

  getTotal(): number {
    const carro = this.getCarro()
    const total = carro.reduce(
      (a: number, b: { TOTAL: number }) => a + b.TOTAL,
      0
    )
    return total
  }

  initCheckout(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/webpay/create`, data)
  }

  getTransaction(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/carro/transaction`, { CODE: id })
  }
}
