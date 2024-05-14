import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroPage implements OnInit {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  birthdate: string;
  gender: string;
  selectedFile: File;
  pfp: string;

  constructor(private authService: AuthService,private router: Router){}

  ngOnInit(){}

  async registro() {
    try {
      if (this.password !== this.repeatPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }

      const credential = await this.authService.signUp(this.name, this.email, this.password, this.pfp, this.birthdate, this.gender);

      console.log('URL del archivo:', this.pfp);
      console.log('Usuario creado exitosamente:', credential);
      this.router.navigate(['/products']);
    }
    catch (error) {
      console.error('Error al registrar usuario:', error);
    }

    console.log('Archivo seleccionado:', this.selectedFile ? this.selectedFile.name : 'Ninguno');
  }


  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pfp = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}