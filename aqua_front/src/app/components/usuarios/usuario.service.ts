import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/users'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}


  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }
  getUsuario(rut_usuario: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${rut_usuario}`);
  }
  deleteUsuario(rut_usuario: any): Observable<any> {
    const url = `${this.apiUrl}/${rut_usuario}`;
    return this.http.delete<any>(url);
  }
  

  // Agrega otros métodos según tus necesidades, como crear, actualizar o eliminar usuarios
}
