import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, OnDestroy, ViewChildren, QueryList } from '@angular/core';

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
  
  constructor (private renderer: Renderer2){}

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