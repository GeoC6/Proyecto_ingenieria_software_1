import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/roles';
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  

  createRol(rol: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, rol);
  }

  updateRol(rolId: number, rol: any): Observable<any> {
    const editUrl = `${this.myAppUrl}${this.myApiUrl}/${rolId}`;
    return this.http.put(editUrl, rol);
  }

  deleteRol(rolId: number): Observable<any> {
    const deleteUrl = `${this.myAppUrl}${this.myApiUrl}/${rolId}`;
    return this.http.delete(deleteUrl);
  }
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user);
  }
}
export interface Rol {
    cod_rol: number;
    nombre_rol: string;
  }