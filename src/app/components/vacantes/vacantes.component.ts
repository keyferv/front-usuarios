import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { VacanteService } from '../../services/vacante.service';
import { Vacante, Categoria } from '../../models/vacante.model';

@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './vacantes.component.html',
  styleUrl: './vacantes.component.css'
})
export class VacantesComponent implements OnInit {
  vacantes: Vacante[] = [];
  categorias: Categoria[] = [];
  isLoading = true;

  constructor(private vacanteService: VacanteService) {}

  ngOnInit(): void {
    this.loadVacantes();
    this.loadCategorias();
  }

  loadVacantes(): void {
    this.isLoading = true;
    this.vacanteService.getVacantes().subscribe({
      next: (data) => {
        this.vacantes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar vacantes', err);
        this.isLoading = false;
      }
    });
  }

  loadCategorias(): void {
    this.vacanteService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorias', err)
    });
  }

  /** Mapeo de estados para el estilo visual */
  getEstadoClass(estado: string): string {
    const e = estado?.toLowerCase() ?? '';
    if (e.includes('activ')) return 'glow-active';
    if (e.includes('cerrad') || e.includes('expira')) return 'glow-closed';
    if (e.includes('pendien')) return 'glow-pending';
    return '';
  }

  isExpiringSoon(expirationDate: string): boolean {
    if (!expirationDate) return false;
    const exp = new Date(expirationDate).getTime();
    const now = new Date().getTime();
    const diffDays = (exp - now) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 3; // Menos de 3 días pero no vencida
  }
}
