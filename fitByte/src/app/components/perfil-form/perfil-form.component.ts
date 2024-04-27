import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'perfil-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css', '../component.css']
})
export class PerfilFormComponent {


  newNickname: string = '';
  newPassWord: string = '';
  consumedKcals: string = '';
  newWeight: string = '';
  newHeight: string = '';
  prevPassWord: string = '';
  repPassWord: string = '';

  user: any;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getUserByID("462f").then((usuario) => {
      if (usuario) {
        this.user = usuario;
        console.log('Usuario obtenido:', usuario);
      } else {
        console.log('Usuario no encontrado.');
      }
    }).catch(error => {
      console.error('Error al obtener usuario:', error);
    });
  }


  handleClickNickName() {
    this.authService.updateValueUser("462f", this.newNickname, 'nickname');
  }

  handleClickPassword() {

    console.log('prevpassword', this.prevPassWord);
    console.log('newpassword', this.newPassWord);
    console.log('reppassword', this.repPassWord);
    if(this.prevPassWord === this.user.password && this.newPassWord === this.repPassWord){
      this.authService.updateValueUser("462f", this.newPassWord, 'password');
    }

  }

  handleClickKcals() {
    this.authService.updateValueUser("462f", this.consumedKcals, 'kcal');
  }



  handleClickWeight() {

    const height = parseInt(this.user.altura)/100;
    const weight = parseInt(this.newWeight);

    if(height > 0){
      const imc = Math.floor(weight / (height * height));
      this.authService.updateValueUser("462f", imc.toString(), 'imc');
      this.authService.updateValueUser("462f", this.newWeight, 'peso');
    }

  }

  handleClickHeight() {

    const weight = parseInt(this.user.peso);
    const height = parseInt(this.newHeight)/100;

    if(height > 0){
      const imc = Math.floor(weight / (height * height));
      this.authService.updateValueUser("462f", imc.toString(), 'imc');
      this.authService.updateValueUser("462f", this.newHeight, 'altura');
    }

  }



}
