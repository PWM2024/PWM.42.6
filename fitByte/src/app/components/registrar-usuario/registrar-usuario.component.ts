import { Component, EventEmitter, Output, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/fire.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserI } from '../../models';

@Injectable()
@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css', '../component.css'],
})

export class RegistrarUsuarioComponent {
  form: FormGroup;
  errorMessage: string = '';
  @Output() volver = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', Validators.required]
    });
    this.form.setValidators(this.passwordMatchValidator());
    this.form.setValidators(this.requiredFieldsValidator());
  }

  volverClick() {
    this.volver.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();

      this.authService.register(rawForm.email, rawForm.username, rawForm.password)
        .then((uid) => {
          const datosUser: UserI = {
            nombre: rawForm.username,
            correo: rawForm.email,
            uid: String(uid),
          };
          sessionStorage.setItem('datosUser', JSON.stringify(datosUser));
          this.volverClick();
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            this.errorMessage = 'El correo electrónico ya está en uso.';
          } else {
            this.errorMessage = 'Ha ocurrido un error al registrar el usuario.';
          }
        });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const password2 = control.get('password2');

      if (password && password2 && password.value !== password2.value) {
        return { 'passwordMismatch': true };
      }

      return null;
    };
  }

  private requiredFieldsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const username = control.get('username');
      const email = control.get('email');
      const password = control.get('password');
      const password2 = control.get('password2');

      if (!username?.value || !email?.value || !password?.value || !password2?.value) {
        return { 'requiredFields': true };
      }

      return null;
    };
  }
}
