
import { Component, HostListener, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css']
})
export class CardServiceComponent {
  
  constructor(private elementRef: ElementRef) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.revealOnScroll();
  }

  isVisible(className: string): boolean {
    const element = this.elementRef.nativeElement.querySelector(`.${className}`);
    if (element) {
      const bounding = element.getBoundingClientRect();
      return bounding.top <= window.innerHeight && bounding.bottom >= 0;
    }
    return false;
  }

  revealOnScroll() {
    const revealElements = this.elementRef.nativeElement.querySelectorAll('.reveal-left, .reveal-right');
    revealElements.forEach((element: HTMLElement) => {
      const className = element.classList.contains('reveal-left') ? 'reveal-left' : 'reveal-right';
      if (this.isVisible(className)) {
        element.classList.add('reveal-visible');
      }
    });
  }

}
