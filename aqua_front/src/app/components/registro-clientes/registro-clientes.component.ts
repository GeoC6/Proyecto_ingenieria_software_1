import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
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
    if (!this.correo || !this.password || !this.celular || !this.nombre || !this.apellido || !this.direccion || !this.confirmPassword) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validate that passwords match
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    // Create the client object as expected by the backend
    const cliente = {
      correo_cliente: this.correo,
      contrasena: this.password,
      celular_cliente: this.celular,
      nombre_cliente: this.nombre,
      apellido_cliente: this.apellido,
      direccion_cliente: this.direccion
    };

    this.loading = true;

    this._clienteService.createCliente(cliente).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el servicio de clientes:', error);
        this.loading = false;
        let errorMsg = 'Error al registrar usuario';
        if (error.error && error.error.msg) {
          errorMsg = error.error.msg;
        }
        this.toastr.error(errorMsg, 'Error');
        return of(null);
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
