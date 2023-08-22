import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepersReclamationComponent } from './stepers-reclamation.component';

describe('StepersReclamationComponent', () => {
  let component: StepersReclamationComponent;
  let fixture: ComponentFixture<StepersReclamationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepersReclamationComponent]
    });
    fixture = TestBed.createComponent(StepersReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
