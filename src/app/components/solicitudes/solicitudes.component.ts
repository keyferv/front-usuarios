import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface Solicitud {
  vacante: string;
  empresa: string;
  fechaSolicitud: string;
  estado: string;
  ultimaActualizacion: string;
  etapa: number; // 0: Enviada, 1: Revisión, 2: Proceso, 3: Decisión
}

@Component({
  selector: 'app-solicitudes',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {
  solicitudes: Solicitud[] = [
    { vacante: 'Desarrollador Frontend', empresa: 'TechCorp', fechaSolicitud: '2026-03-10', estado: 'En revisión', ultimaActualizacion: '2026-03-12', etapa: 1 },
    { vacante: 'Diseñador UX/UI', empresa: 'DesignStudio', fechaSolicitud: '2026-03-08', estado: 'Aceptada', ultimaActualizacion: '2026-03-11', etapa: 3 },
    { vacante: 'Ingeniero de Software', empresa: 'SoftwareSA', fechaSolicitud: '2026-03-05', estado: 'Rechazada', ultimaActualizacion: '2026-03-09', etapa: 3 },
    { vacante: 'Analista de Datos', empresa: 'DataTech', fechaSolicitud: '2026-03-12', estado: 'En proceso', ultimaActualizacion: '2026-03-13', etapa: 2 },
    { vacante: 'Project Manager', empresa: 'ManagementInc', fechaSolicitud: '2026-03-09', estado: 'Pendiente', ultimaActualizacion: '2026-03-09', etapa: 0 }
  ];

  getEstadoColor(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'aceptada': return '#10b981'; // emerald
      case 'en revisión': return '#f59e0b'; // amber
      case 'en proceso': return '#3b82f6'; // blue
      case 'rechazada': return '#ef4444'; // red
      case 'pendiente': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'aceptada': return 'text-emerald-500 bg-emerald-500/10';
      case 'en revisión': return 'text-amber-500 bg-amber-500/10';
      case 'en proceso': return 'text-blue-500 bg-blue-500/10';
      case 'rechazada': return 'text-red-500 bg-red-500/10';
      case 'pendiente': return 'text-gray-500 bg-gray-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  }

  getEtapaTexto(etapa: number): string {
    const etapas = ['Enviada', 'Revisión', 'Proceso', 'Decisión'];
    return etapas[etapa] || 'Desconocida';
  }

  getEtapaClass(etapa: number, actual: number): string {
    if (actual < etapa) return 'bg-gray-700'; // Future step
    if (actual === etapa) return 'bg-emerald-500 ring-2 ring-emerald-500'; // Current step
    return 'bg-emerald-500'; // Completed step
  }

  getEtapaIcon(etapa: number, actual: number): string {
    if (actual < etapa) return 'radio_button_unchecked'; // Future step
    if (actual === etapa) return 'radio_button_checked'; // Current step
    return 'check_circle'; // Completed step
  }

  getEtapaColor(etapa: number, actual: number): string {
    if (actual < etapa) return 'text-gray-500'; // Future step
    if (actual === etapa) return 'text-emerald-500'; // Current step
    return 'text-white'; // Completed step
  }
}
