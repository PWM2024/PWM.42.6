import { Component, EventEmitter, Output, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/fire.service';
import { Router } from '@angular/router';
import { UserI } from '../../models';

@Injectable()
@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css', '../component.css'],
})
export class IniciarSesionComponent {
  form: FormGroup;
  enviado = false;

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
        .then((uid) => {
          const datosUser: UserI = {
            nombre: rawForm.username,
            correo: rawForm.email,
            uid: String(uid),
          };
          console.log('datosUser:', datosUser);
          sessionStorage.setItem('datosUser', JSON.stringify(datosUser));
          console.log('Inicio de sesión exitoso');
          this.authService.eventoLogged.emit();
          this.volverClick();
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error durante el inicio de sesión:', error);
        });
    }
    this.enviado = true;
  }

}
