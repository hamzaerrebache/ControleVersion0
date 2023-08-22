import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreDePropeieteComponent } from './titre-de-propeiete.component';

describe('TitreDePropeieteComponent', () => {
  let component: TitreDePropeieteComponent;
  let fixture: ComponentFixture<TitreDePropeieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitreDePropeieteComponent]
    });
    fixture = TestBed.createComponent(TitreDePropeieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
