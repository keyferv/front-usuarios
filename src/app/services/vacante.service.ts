import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacante, Categoria, Estado } from '../models/vacante.model';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {
  private apiUrl = '/vacantes';
  private catUrl = '/categorias';
  private estUrl = '/estados';

  constructor(private http: HttpClient) {}

  /** Obtener todas las vacantes */
  getVacantes(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(this.apiUrl);
  }

  /** Obtener detalles de una vacante */
  getVacanteById(id: number): Observable<Vacante> {
    return this.http.get<Vacante>(`${this.apiUrl}/${id}`);
  }

  /** Obtener vacantes destacadas */
  getVacantesDestacadas(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(`${this.apiUrl}/destacadas`); 
  }

  /** Obtener categorías para filtros */
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.catUrl);
  }

  /** Obtener estados */
  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.estUrl);
  }
}
