import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/fire.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  linkFacebook = '';
  linkTwitter = '';
  linkInstagram = '';
  linkTiktok = '';

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.getImageUrl('Source/social-networks/facebook.png').subscribe(url => {
      this.linkFacebook = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
    this.authService.getImageUrl('Source/social-networks/twitter.png').subscribe(url => {
      this.linkTwitter = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
    this.authService.getImageUrl('Source/social-networks/instagram.png').subscribe(url => {
      this.linkInstagram = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
    this.authService.getImageUrl('Source/social-networks/tik-tok.png').subscribe(url => {
      this.linkTiktok = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
  }
}
