import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from 'src/app/services/error.service';
import { InventarioService } from 'src/app/components/inventario/inventario.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class InventarioCreateComponent implements OnInit {

  nombre: string = '';
  precio: string = '';
  cantidad_total: string = '';
  cantidad_disponible: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _inventarioService: InventarioService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  } 

  addInventario() {

    // Validamos que el usuario ingrese valores
    if (this.nombre == '' || this.precio == '' || this.cantidad_total == '' || this.cantidad_disponible == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Creamos el objeto
    const inventario: Inventario = {
      nombre_producto: this.nombre,
      precio: this.precio,
      cantidad_total: this.cantidad_total,
      cantidad_disponible: this.cantidad_disponible
    }

    this.loading = true;
  this._inventarioService.createInventario(inventario).subscribe({
    next: (v) => {
        this.loading = false;
        this.toastr.success(`El producto fue registrado con exito`, 'Producto registrado');
        this.router.navigate(['/navigator']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }
}
export interface Inventario {
  nombre_producto: string,
  precio: string,
  cantidad_total: string,
  cantidad_disponible: string
}
