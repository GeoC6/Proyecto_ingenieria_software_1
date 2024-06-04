import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from 'src/app/services/error.service';
import { InventarioService } from 'src/app/components/inventario/inventario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class InventarioEditComponent implements OnInit {

  codigo_producto: string = '';
  nombre: string = '';
  precio: string = '';
  cantidad_total: string = '';
  cantidad_disponible: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private route: ActivatedRoute,
    private _inventarioService: InventarioService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this._inventarioService.obtenerInventario(id).subscribe((data: any) => {
    this.codigo_producto = data.COD_PRODUCTO,
    this.nombre = data.NOMBRE_PRODUCTO,
    this.precio = data.PRECIO_PRODUCTO,
    this.cantidad_disponible = data.CANTIDAD_DISPONIBLE
    this.cantidad_total = data.CANTIDAD_TOTAL
    })
  } 

  updateInventario() {

    // Validamos que el producto ingrese valores
    if (this.nombre == '' || this.precio == '' || this.cantidad_total == '' || this.cantidad_disponible == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Creamos el objeto
    const inventario: Inventario = {
      cod_producto: this.codigo_producto,
      nombre_producto: this.nombre,
      precio: this.precio,
      cantidad_total: this.cantidad_total,
      cantidad_disponible: this.cantidad_disponible
    }

    this.loading = true;
  this._inventarioService.editInventario(inventario).subscribe({
    next: (v) => {
        this.loading = false;
        this.toastr.success(`El producto fue modificado con exito`, 'Producto modificado');
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
  cod_producto: string,
  nombre_producto: string,
  precio: string,
  cantidad_total: string,
  cantidad_disponible: string
}
