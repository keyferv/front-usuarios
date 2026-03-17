import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VacantesComponent } from './components/vacantes/vacantes.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { TestAuthBypassComponent } from './test-auth-bypass/test-auth-bypass.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'dashboard',        component: DashboardComponent,      canActivate: [authGuard] },
  { path: 'vacantes',         component: VacantesComponent,       canActivate: [authGuard] },
  { path: 'solicitudes',      component: SolicitudesComponent,    canActivate: [authGuard] },
  { path: 'profile',          component: ProfileComponent,        canActivate: [authGuard] },
  { path: 'login',            component: LoginComponent },
  { path: 'register',         component: RegisterComponent },
  { path: 'test-auth-bypass', component: TestAuthBypassComponent },
  { path: 'home',             redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '',                 redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**',               redirectTo: '/dashboard' },
];

