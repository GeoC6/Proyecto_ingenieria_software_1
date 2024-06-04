import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { UsuarioService } from './usuario.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@NgModule({
  declarations: [
    // Declaraciones de componentes
  ],
  imports: [
    MatTableModule,MatButtonModule, MatDividerModule, MatIconModule,
    // Otros módulos de Angular Material que estés utilizando
  ],
  providers: [
    // Servicios y otros proveedores
  ]
})
export class UsuariosModule { }

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: any[] = ['rut', 'nombre', 'apellido1 usuario', 'apellido2 usuario','rol','acciones usuario'];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    // Cuando se inicia el componente, obtén los usuarios del servicio
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      console.log(data)
      this.usuarios = data;
    });
  }

  // Método para editar un usuario
  editarUsuario(usuario: any) {
    // Aquí puedes implementar la lógica para editar un usuario
    this.router.navigate(['usuarios/edit',usuario]);
  }

  // Método para eliminar un usuario
  eliminarUsuario(rut_usuario: any) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(rut_usuario).subscribe(() => {
        console.log('Usuario eliminado exitosamente');
        this.actualizarListaDeUsuarios();
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      });
    }
  }
  actualizarListaDeUsuarios() {
    // Actualiza la lista de usuarios después de eliminar uno o editar
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }
  redirectToSignIn() {
    // Redirige a la página de registro (reemplaza 'nombre-de-ruta' con la ruta real)
    this.router.navigate(['/signIn']);
  }
  getRolNombre(codRol: number): string {
    return codRol === 1 ? 'Administrador' : (codRol === 2 ? 'Empleado' : 'Desconocido');
  }
}

