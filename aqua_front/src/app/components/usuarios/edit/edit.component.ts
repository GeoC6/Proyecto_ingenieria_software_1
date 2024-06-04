import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

  username: string = '';
  name: string = '';
  password: string = '';
  apellido1: string = '';
  apellido2: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _errorService: ErrorService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this._userService.obtenerUsuario(id).subscribe((data: any) => {
      this.username = data.RUT_USUARIO,
      this.name = data.NOMBRE_USUARIO
      this.apellido1 = data.APELLIDO1_USUARIO
      this.apellido2 = data.APELLIDO2_USUARIO
    })
  }

  updateUser() {

    // Validamos que el usuario ingrese valores
    if (this.username == '' || this.name == '' || this.apellido1 == '' || this.apellido2 == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      rut_usuario: this.username,

      nombre_usuario: this.name,
      apellido1_usuario: this.apellido1,
      apellido2_usuario: this.apellido2
    }

    this.loading = true;
    this._userService.editarUsuario(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue modificado con exito`, 'Usuario modificado');
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
export interface User {
  rut_usuario: string,

  nombre_usuario: string,
  apellido1_usuario: string,
  apellido2_usuario: string
}