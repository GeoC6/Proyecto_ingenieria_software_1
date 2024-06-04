import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rol: number = 0;
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  login() {

    // Validamos que el usuario ingrese datos
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }
    

    // Creamos el body
    const user: User = {
      rut_usuario: this.username,
      contrasena: this.password,
      cod_rol: this.rol,
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: () => {
        // Obtén el rol del token
        const userRol = this._userService.getRolFromToken();
  
        // Verifica el rol y redirige al componente correspondiente
        if (userRol === 1) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/empleado']);
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      },
    });
    
  }
  showPassword: boolean = false;

togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}

capsLockOn: boolean = false;

checkCapsLock(event: KeyboardEvent) {
    this.capsLockOn = event.getModifierState('CapsLock');
}
}
