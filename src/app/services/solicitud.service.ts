import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SolicitudRequest {
  vacanteId: number;
  usuarioId: number;
  comment?: string;
}

export interface SolicitudResponse {
  id: number;
  requestDate: string;
  comment: string;
  status: string;
  vacancyName: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = '/solicitudes';

  constructor(private http: HttpClient) {}

  /** Aplicar a una vacante */
  aplicar(solicitud: SolicitudRequest): Observable<SolicitudResponse> {
    return this.http.post<SolicitudResponse>(this.apiUrl, solicitud);
  }

  /** Obtener solicitudes por ID de usuario */
  getPorUsuario(idUsuario: number): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }
}
