import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { RolService } from 'src/app/services/rol.service'; 
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  name: string = '';
  password: string = '';
  apellido1: string = '';
  apellido2: string = '';
  rol: number = 0;
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private _rolService : RolService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void { //inicializa el componente
  }

  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.username == '' || this.name == '' || this.password == '' || this.confirmPassword == '' || this.apellido1 == '' || this.apellido2 == '' || this.rol == 0) {
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
      contrasena: this.password,
      nombre_usuario: this.name,
      apellido1_usuario: this.apellido1,
      apellido2_usuario: this.apellido2,
      cod_rol: +this.rol,
    }

    this.loading = true;
    this._rolService.createRol({ cod_rol: user.cod_rol, nombre_rol: 'Nombre del Rol' }).pipe(
      catchError((rolError) => {
        console.error('Error en el servicio de roles:', rolError);
        return of(null); // Retorna un observable vacío para continuar con la lógica del usuario
      })
    ).subscribe(() => {
      this._userService.signIn(user).subscribe({
        next: (v) => {
          this.loading = false;
          if(this.rol == 1){
            this.toastr.success(`El usuario ${this.username} fue registrado con éxito como administrador`, 'Usuario registrado');
            this.router.navigate(['/admin']);
          }
          else if (this.rol == 2){
            this.toastr.success(`El usuario ${this.username} fue registrado con éxito como empleado`, 'Usuario registrado');
            this.router.navigate(['/admin']);
          }
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          console.error(e);
          this._errorService.msjError(e);
        }
      });
    });
  }
}
export interface User {
  rut_usuario: string,
  contrasena: string,
  nombre_usuario: string,
  apellido1_usuario: string,
  apellido2_usuario: string,
  cod_rol: number,
}
