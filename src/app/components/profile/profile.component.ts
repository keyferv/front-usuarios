import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioService, UsuarioResponse } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  usuario: UsuarioResponse | null = null;
  isLoading = true;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.usuarioService.getCurrentUser().subscribe({
      next: (data) => {
        this.usuario = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el perfil', err);
        this.isLoading = false;
      }
    });
  }

  get fullName(): string {
    if (!this.usuario) return '';
    return `${this.usuario.name} ${this.usuario.lastname}`;
  }

  // Habilidades ficticias ya que no están en el backend aún
  skills = [
    { name: 'Angular', level: 90 },
    { name: 'TypeScript', level: 95 },
    { name: 'Spring Boot', level: 85 }
  ];
}
