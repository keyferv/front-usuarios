import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VacanteService } from '../../services/vacante.service';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: string | null;
  vacantesActivas = 0;
  misSolicitudes = 0;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private vacanteService: VacanteService,
    private solicitudService: SolicitudService
  ) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;
    
    // Obtenemos vacantes reales
    this.vacanteService.getVacantes().subscribe({
      next: (data) => {
        this.vacantesActivas = data.length;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });

    // Aquí llamaríamos a mis solicitudes si supiéramos el ID
    // Por ahora dejamos el mock o 0 si no hay ID
    this.misSolicitudes = 0; 
  }

  get statCards() {
    return [
      { title: 'Vacantes Activas', count: this.vacantesActivas.toString(), icon: 'work', borderColor: 'border-l-4 border-l-blue-500', route: '/vacantes' },
      { title: 'Mis Solicitudes', count: this.misSolicitudes.toString(), icon: 'description', borderColor: 'border-l-4 border-l-green-500', route: '/solicitudes' },
      { title: 'Perfil Completo', count: '85%', icon: 'person', borderColor: 'border-l-4 border-l-indigo-500', route: '/profile' },
      { title: 'Mensajes', count: '0', icon: 'mail', borderColor: 'border-l-4 border-l-purple-500', route: '/messages' }
    ];
  }

  activityTimeline = [
    { type: 'info', icon: 'notifications', text: 'Bienvenido al nuevo sistema de gestión de empleos', time: 'Ahora mismo' }
  ];
}
