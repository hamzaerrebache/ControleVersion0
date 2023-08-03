import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentresComponent } from './list-centres.component';

describe('ListCentresComponent', () => {
  let component: ListCentresComponent;
  let fixture: ComponentFixture<ListCentresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCentresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
