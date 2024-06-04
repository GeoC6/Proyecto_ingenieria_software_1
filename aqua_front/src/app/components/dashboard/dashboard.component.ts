import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  listProduct: Product[] = []

  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  validateToken() {
    if (localStorage.getItem("token") === null) {
      this.router.navigate(['/login'])
    }
  }
  
  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    })
  }

}
