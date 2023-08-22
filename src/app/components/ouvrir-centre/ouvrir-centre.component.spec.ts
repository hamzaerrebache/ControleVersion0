import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrirCentreComponent } from './ouvrir-centre.component';

describe('OuvrirCentreComponent', () => {
  let component: OuvrirCentreComponent;
  let fixture: ComponentFixture<OuvrirCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OuvrirCentreComponent]
    });
    fixture = TestBed.createComponent(OuvrirCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
