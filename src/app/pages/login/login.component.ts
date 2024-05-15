import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){}

  async login() {
    try {
      const credential = await this.authService.signIn(this.email, this.password);
      console.log('Usuario iniciado exitosamente:', credential);
      this.router.navigate(['/animals']);
    }
    catch (error) {
      console.error('Error al iniciar sesion de usuario:', error);
    }
  }

  goToRegisterPage(){
    this.router.navigate(['/registro']);
  }

}
