import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Credentials } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './logincliente.component.html',
  styleUrls: ['./logincliente.component.css']
})
export class LoginClienteComponent {
  correo: string = '';
  contrasena: string = '';
  loading: boolean = false;
  capsLockOn: boolean = false;
  showPassword: boolean = false;
  cod_cliente: number = 0;

  constructor(
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  login() {
    if (!this.correo || !this.contrasena) {
      this.toastr.error('Correo y contraseña son obligatorios', 'Error');
      return;
    }

    this.loading = true;

    const credentials : Credentials = {
      correo_cliente: this.correo,
      contrasena: this.contrasena,
      cod_cliente: this.cod_cliente
    };
    

    this.loading = true;
    // console.log("Estamos en logincliente.component")
    this.clienteService.loginCliente(credentials).subscribe({
      next: () => {
        const cod_cliente = this.clienteService.getCodFromToken();

        if (cod_cliente != null){
          this.toastr.success('Login exitoso', 'Bienvenido');
          this.router.navigate(['/perfil'])
        } else {
          this.toastr.error('Error en el servicio de login2', 'Error');
        }
      }
    });
   

    this.clienteService.loginCliente(credentials).subscribe(
      response => {
        this.loading = false;
        if (response && response.token) {
          this.toastr.success('Login exitoso', 'Bienvenido');
        } else {
          this.toastr.error('Error en el servicio de login', 'Error');
        }
      },
      error => {
        this.loading = false;
        this.toastr.error('Error en el servicio de login', 'Error');
        console.error('Error en el servicio de login:', error);
      }
    );
  }

  checkCapsLock(event: KeyboardEvent) {
    this.capsLockOn = event.getModifierState && event.getModifierState('CapsLock');
  }
}
