import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/** Rutas donde NO se muestra el navbar (páginas de autenticación) */
const AUTH_ROUTES = ['/login', '/register'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <div class="app-container" style="background: var(--bg-primary); min-height: 100vh;">
      <app-navbar *ngIf="showNavbar$ | async"></app-navbar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavbar$: Observable<boolean>;

  constructor(private router: Router) {
    this.showNavbar$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.split('?')[0]; // ignorar query params
        return !AUTH_ROUTES.includes(url);
      })
    );
  }
}
