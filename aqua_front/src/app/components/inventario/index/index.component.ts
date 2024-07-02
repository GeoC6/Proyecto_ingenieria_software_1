import { Component,  NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { InventarioService } from '../inventario.service';
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
export class InventarioIndexModule { }

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class InventarioIndexComponent implements OnInit {

  inventario: any[] = [];
  displayedColumns: any[] = ['cod_producto', 'nombre_producto', 'precio_producto', 'cantidad_total', 'cantidad_disponible','acciones usuario'];

  constructor(private inventarioService: InventarioService, private router: Router) {}

  ngOnInit() {
    // Cuando se inicia el componente, obtén los usuarios del servicio
    this.actualizarListaDeInventario()
  }

  crearInventario() {
    // Aquí puedes implementar la lógica para editar un usuario
    this.router.navigate(['inventario/create']);
  }

  editarInventario(inventario: any) {
    // Aquí puedes implementar la lógica para editar un usuario
    this.router.navigate(['inventario/edit',inventario]);
  }

  eliminar_inventario(codigo_inventario: any) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.inventarioService.removeInventario(codigo_inventario).subscribe(() => {
        console.log('Producto eliminado exitosamente');
        this.actualizarListaDeInventario();
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      });
    }
  }

  actualizarListaDeInventario() {
    // Actualiza la lista de usuarios después de eliminar uno o editar
    this.inventarioService.getInventario().subscribe((data: any) => {
      console.log(data)
      this.inventario = data;
    });
  }

}
