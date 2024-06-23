import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service'; // Adjust the path as necessary
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-registro-clientes',
  templateUrl: './registro-clientes.component.html',
  styleUrls: ['./registro-clientes.component.css']
})
export class RegistroClienteComponent implements OnInit {
  correo: string = '';
  celular: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _clienteService: ClienteService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  addUser() {
    // Validate the form inputs
    if (!this.correo || !this.celular || !this.nombre || !this.apellido || !this.direccion || !this.password || !this.confirmPassword) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validate that passwords match
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Create the client object
    const cliente: Cliente = {
      CORREO_CLIENTE: this.correo,
      CELULAR_CLIENTE: this.password, // Assuming the password is to be hashed
      NOMBRE_CLIENTE: this.nombre,
      APELLIDO_CLIENTE: this.apellido,
      DIRECCION_CLIENTE: this.direccion
    };

    this.loading = true;

    this._clienteService.createCliente(cliente).pipe(
      catchError((clienteError) => {
        console.error('Error en el servicio de clientes:', clienteError);
        this.loading = false;
        this._errorService.msjError(clienteError);
        return of(null); // Return an empty observable to continue
      })
    ).subscribe(response => {
      this.loading = false;
      if (response) {
        this.toastr.success(`El usuario ${this.correo} fue registrado con éxito`, 'Usuario registrado');
        this.router.navigate(['/perfil']);
      }
    });
  }
}

export interface Cliente {
  CORREO_CLIENTE: string;
  CELULAR_CLIENTE: string;
  NOMBRE_CLIENTE: string;
  APELLIDO_CLIENTE: string;
  DIRECCION_CLIENTE: string;
}
