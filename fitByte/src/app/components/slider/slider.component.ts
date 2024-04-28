import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css', '../component.css']
})

export class SliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contenedorSlider') sliderContainer!: ElementRef;
  @ViewChildren('contenedorImgSlider') sliderItems!: QueryList<ElementRef>;
  slideIndex = 1;
  sliderInterval: any;
  interval = 3000;
  width = 0;
  linkImage1 ='';
  linkImage2 ='';
  linkImage3 ='';
  
  constructor(private renderer: Renderer2, private authService: AuthService) { }


  ngOnInit() {
    this.authService.getImageUrl('Source/slider-img/banner1.png').subscribe(url => {
      this.linkImage1 = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
    this.authService.getImageUrl('Source/slider-img/banner2.png').subscribe(url => {
      this.linkImage2 = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
    this.authService.getImageUrl('Source/slider-img/banner3.png').subscribe(url => {
      this.linkImage3 = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
  }


  ngAfterViewInit() {
    console.log(this.sliderItems.length)
    let slideWidth = (this.sliderItems.length > 0) ? this.sliderItems.first.nativeElement.clientWidth : 0;
    this.width = slideWidth;

    this.sliderInterval = setInterval(() => {
      this.showSlides();
    }, this.interval);

    window.addEventListener("resize", () => {
      slideWidth = (this.sliderItems.length > 0) ? this.sliderItems.first.nativeElement.clientWidth : 0;
      this.width = slideWidth;
    });
  }

  ngOnDestroy(){
    clearInterval(this.sliderInterval);
  }



  showSlides() {
    if (this.sliderItems.length === 0) {
      return; // Evitar errores si no hay elementos con la clase
    }

    this.renderer.setStyle(this.sliderContainer.nativeElement, 'transform', `translate(${-this.width * this.slideIndex}px)`);
    this.renderer.setStyle(this.sliderContainer.nativeElement, 'transition', 'transform .8s');
    this.slideIndex++;

    if (this.slideIndex == this.sliderItems.length) {
      setTimeout(() => {
        this.renderer.setStyle(this.sliderContainer.nativeElement, 'transform', 'translate(0px)');
        this.renderer.setStyle(this.sliderContainer.nativeElement, 'transition', 'transform 0s');
        this.slideIndex = 1;
      }, 1500);
    }
  }
}