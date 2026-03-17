import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioResponse {
  idUsuario: number;
  name: string;
  lastname: string;
  email: string;
  username: string;
  birthDate: string;
  jobTitle: string;
  phone: string;
  certifications: string;
  isEnabled: boolean;
  estado: string;
  roles: string[];
  dateRegister: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = '/usuarios';

  constructor(private http: HttpClient) {}

  /** Obtener perfil por ID */
  getUsuarioById(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/findById/${id}`);
  }

  /** Actualizar perfil */
  updateUsuario(id: number, data: any): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/update/${id}`, data);
  }

  /** Obtener el perfil del usuario actual por username */
  getUsuarioByUsername(username: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/username/${username}`);
  }

  /** Obtener el perfil del usuario actual (Helper) */
  getCurrentUser(): Observable<UsuarioResponse> {
    const username = localStorage.getItem('username');
    if (!username) throw new Error('No hay usuario logueado');
    return this.getUsuarioByUsername(username);
  }
}
