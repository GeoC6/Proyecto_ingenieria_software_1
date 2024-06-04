import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  navigateToProductos() {
    this.router.navigate(['/productos']); // La ruta '/productos' debe coincidir con la configuración de tus rutas
  }
  

}
