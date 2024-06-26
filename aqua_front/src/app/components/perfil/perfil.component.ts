import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';

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
    direccion_cliente: ''
  };
  loading: boolean = false;
  editable: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {}

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
        direccion_cliente: clienteActual.direccion_cliente
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
    this.loading = true;

    const clienteActual = this.clienteService.getClienteActual();

    if (clienteActual && clienteActual.correo_cliente) {
      this.clienteService.updateCliente(clienteActual.correo_cliente, this.clienteInfo).subscribe(
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

  updateFieldValue(event: Event, field: keyof Cliente) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.clienteInfo[field] = target.value;
    }
  }
}
