import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Importa el módulo de la tabla
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { IndexComponent } from './index/index.component';
import { EditVehiculoComponent } from './edit-vehiculo/edit-vehiculo.component';



// Importa otros módulos de Angular Material que estés utilizando


@NgModule({
  declarations: [
    IndexComponent,
    EditVehiculoComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
  ],
})
export class VehiculoModule {}
