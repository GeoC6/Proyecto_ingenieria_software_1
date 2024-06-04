
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from 'src/app/services/error.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-edit-vehiculo',
  templateUrl: './edit-vehiculo.component.html',
  styleUrls: ['./edit-vehiculo.component.css']
})
export class EditVehiculoComponent implements OnInit {


  patente_cod_vehiculo: string = '';
  marca: string = '';
  modelo: string = '';
  color: string = '';
  ano: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _vehiculoService: VehiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private _errorService: ErrorService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this._vehiculoService.obtenerVehiculo(id).subscribe((data: any) => {
      this.patente_cod_vehiculo = data.PATENTE_COD_VEHICULO,
      this.marca = data.MARCA
      this.color = data.COLOR
      this.ano = data.ANO
    })
  }

  updateVehiculo() {

    // Validamos que el usuario ingrese valores
    if (this.patente_cod_vehiculo == '' || this.marca == '' || this.modelo == '' || this.color == '' || this.ano == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    

    // Creamos el objeto
    const vehiculo: Vehiculo = {
      patente_cod_vehiculo: this.patente_cod_vehiculo,
      marca: this.marca,
      modelo: this.modelo,
      color: this.color,
      ano: this.ano
    }

    this.loading = true;
    this._vehiculoService.editarVehiculo(vehiculo).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El vehiculo ${this.patente_cod_vehiculo} fue modificado con exito`, 'Usuario modificado');
        this.router.navigate(['/navigator']);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e)
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }

}
export interface Vehiculo {
  patente_cod_vehiculo: string,
  marca: string,
  modelo: string,
  color: string,
  ano: string
}