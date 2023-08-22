import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilsDeSecuriteComponent } from './conseils-de-securite.component';

describe('ConseilsDeSecuriteComponent', () => {
  let component: ConseilsDeSecuriteComponent;
  let fixture: ComponentFixture<ConseilsDeSecuriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConseilsDeSecuriteComponent]
    });
    fixture = TestBed.createComponent(ConseilsDeSecuriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
