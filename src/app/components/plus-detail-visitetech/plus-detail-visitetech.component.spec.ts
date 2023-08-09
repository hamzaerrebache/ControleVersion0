import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusDetailVisitetechComponent } from './plus-detail-visitetech.component';

describe('PlusDetailVisitetechComponent', () => {
  let component: PlusDetailVisitetechComponent;
  let fixture: ComponentFixture<PlusDetailVisitetechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlusDetailVisitetechComponent]
    });
    fixture = TestBed.createComponent(PlusDetailVisitetechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
