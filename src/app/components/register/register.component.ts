import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /** Acceso rápido a los controles del formulario */
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const { fullName, username, email, password } = this.registerForm.value;

    // El backend espera: name, lastname, username, email, password
    // Dividimos fullName en name y lastname
    const nameParts = ((fullName as string) ?? '').trim().split(' ');
    const payload = {
      name:     nameParts[0] ?? '',
      lastname: (nameParts.slice(1).join(' ')) || (nameParts[0] ?? ''),
      username,
      email,
      password,
    };

    // Endpoint real del backend: POST /usuarios/add
    this.http.post('/usuarios/add', payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('¡Cuenta creada! Inicia sesión.', 'OK', {
          duration: 4000,
          verticalPosition: 'top',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        const msg = err?.error?.message ?? 'Error al registrar. Intenta de nuevo.';
        this.snackBar.open(msg, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'top',
        });
      },
    });
  }
}
