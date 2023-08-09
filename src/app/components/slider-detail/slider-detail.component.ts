import { AfterViewInit, Component } from '@angular/core';
declare const mdb: any;
@Component({
  selector: 'app-slider-detail',
  templateUrl: './slider-detail.component.html',
  styleUrls: ['./slider-detail.component.css']
})
export class SliderDetailComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    mdb.Carousel.init(document.getElementById('carouselExampleIndicators'));
  }

}
