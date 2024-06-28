import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente, Boleta } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  clienteInfo: Cliente = {
    correo_cliente: '',
    contrasena: '',
    celular_cliente: '',
    nombre_cliente: '',
    apellido_cliente: '',
    direccion_cliente: '',
    cod_cliente: 0,

  };
  boletas: Boleta[] = [];
  loading: boolean = false;
  editable: boolean = false;


  
  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  irAInicio() {
    this.router.navigate(['/inicio']);
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio'])
}

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {
    this.loading = true;
    const clienteActual = this.clienteService.getClienteActual();

    if (clienteActual) {
      this.clienteInfo = { 
        correo_cliente: clienteActual.correo_cliente,
        contrasena: clienteActual.contrasena,
        celular_cliente: clienteActual.celular_cliente,
        nombre_cliente: clienteActual.nombre_cliente,
        apellido_cliente: clienteActual.apellido_cliente,
        direccion_cliente: clienteActual.direccion_cliente,
        cod_cliente: clienteActual.cod_cliente
      };
      this.loading = false;
    } else {
      this.toastr.error('No se ha encontrado la información del cliente', 'Error');
      this.loading = false;
    }
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.clienteInfo.contrasena) {
      this.toastr.error('La contraseña es requerida para actualizar la información', 'Error');
      return;
    }
    this.loading = true;
    const clienteActual = this.clienteService.getClienteActual();
    if (clienteActual && clienteActual.correo_cliente) {
      this.clienteService.updateCliente(clienteActual.cod_cliente, this.clienteInfo).subscribe(
        response => {
          this.toastr.success('Información actualizada exitosamente', 'Éxito');
          this.loading = false;
          this.editable = false;
        },
        error => {
          this.toastr.error('Error al actualizar la información del cliente', 'Error');
          this.loading = false;
          console.error('Error al actualizar la información del cliente:', error);
        }
      );
    } else {
      this.toastr.error('No se ha encontrado la información del cliente para actualizar', 'Error');
      this.loading = false;
    }
  }
  getBoletas() {
    const cod_cliente = this.clienteService.getCodFromToken();
    if (cod_cliente) {
      this.clienteService.getBoletasByCliente(cod_cliente).subscribe(
        boletas => this.boletas = boletas,
        error => this.toastr.error('Error al obtener las boletas del cliente', 'Error')
      );
    }
  }
}