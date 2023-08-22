import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSliderCentreComponent } from './list-slider-centre.component';

describe('ListSliderCentreComponent', () => {
  let component: ListSliderCentreComponent;
  let fixture: ComponentFixture<ListSliderCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSliderCentreComponent]
    });
    fixture = TestBed.createComponent(ListSliderCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
