import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsComponent } from './tarifs.component';

describe('TarifsComponent', () => {
  let component: TarifsComponent;
  let fixture: ComponentFixture<TarifsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifsComponent]
    });
    fixture = TestBed.createComponent(TarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
