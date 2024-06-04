import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Importa el módulo de la tabla
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';



// Importa otros módulos de Angular Material que estés utilizando


@NgModule({
  declarations: [
    IndexComponent,
    EditComponent
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
export class UsuariosModule {}

