import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ErrorService } from 'src/app/services/error.service';
@Component({
  selector: 'app-sign-in-vehiculo',
  templateUrl: './sign-in-vehiculo.component.html',
  styleUrls: ['./sign-in-vehiculo.component.css']
})
export class SignInVehiculoComponent implements OnInit {
  patente_cod_vehiculo: string = '';
  marca: string = '';
  modelo: string = '';
  color: string = '';
  ano: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _vehiculoService: VehiculoService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  addVehiculo() {

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
    this._vehiculoService.signInVehiculo(vehiculo).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`La patente ${this.patente_cod_vehiculo} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/navigator']);
      },
      error: (e: HttpErrorResponse) => {
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
