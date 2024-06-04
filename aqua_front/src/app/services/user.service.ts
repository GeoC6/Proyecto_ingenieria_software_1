import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
   }

   signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
   }
   login(user: User): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
      .pipe(
        tap(response => {
          // Almacena el token y el rol en el localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('rol', response.rol.toString());
        })
      );
  }
   navigator(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
   }
   editarUsuario(usuario: any): Observable<any> {
    const editUrl = `${this.myAppUrl}${this.myApiUrl}/${usuario.rut_usuario}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.put(editUrl, usuario); // Realiza una solicitud PUT al servidor
  }
  obtenerUsuario(usuario: any): Observable<any> {
    const editUrl = `${this.myAppUrl}${this.myApiUrl}/${usuario}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.get<any[]>(editUrl); // Realiza una solicitud PUT al servidor
  }
  eliminarUsuario(userId: number): Observable<any> {
    const deleteUrl = `${this.myAppUrl}/usuarios/${userId}`; // Reemplaza 'usuarios' con la ruta correcta de tu API
    return this.http.delete(deleteUrl); // Realiza una solicitud DELETE al servidor
  }
  createRole(rol: number): Observable<any> {
    return this.http.post(`${this.myAppUrl}/api/roles`, rol);
  }
  getRolFromToken(): number | null {
    const rol = localStorage.getItem('rol');
    return rol ? +rol : null;
  }
  

}
export interface User {
  rut_usuario: string,
  contrasena: string,
  cod_rol: number,

}

