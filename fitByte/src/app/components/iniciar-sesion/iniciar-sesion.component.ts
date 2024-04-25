import { Component, EventEmitter, Output, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css', '../component.css'],
})
export class IniciarSesionComponent {
  form: FormGroup;

  @Output() volver = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  volverClick() {
    this.volver.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.authService.login(rawForm.email, rawForm.password)
        .pipe(
          switchMap((response) => {
            console.log('Inicio de sesión exitoso');
            this.volverClick();
            this.authService.eventoLogged.emit()
            window.location.reload();
            return of(response);
          }),
          catchError((error) => {
            console.error('Error durante el inicio de sesión:', error);
            return of(error);
          })
        )
        .subscribe();
    }
  }
}
