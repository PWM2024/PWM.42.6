import { Component, EventEmitter, Output, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms'; // Importa ValidatorFn y AbstractControl
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css', '../component.css'],
})
export class RegistrarUsuarioComponent {
  form: FormGroup;

  @Output() volver = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
    this.form.setValidators(this.passwordMatchValidator());
  }

  volverClick() {
    this.volver.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.authService
        .register(rawForm.email, rawForm.username, rawForm.password)
        .subscribe(() => {
          this.volverClick();
        });
    }
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = control.get('password');
      const password2 = control.get('password2');

      if (password && password2 && password.value !== password2.value) {
        return { 'passwordMismatch': true };
      }
      
      return null;
    };
  }
}
