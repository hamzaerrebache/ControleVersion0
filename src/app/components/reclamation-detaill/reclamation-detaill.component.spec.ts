import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationDetaillComponent } from './reclamation-detaill.component';

describe('ReclamationDetaillComponent', () => {
  let component: ReclamationDetaillComponent;
  let fixture: ComponentFixture<ReclamationDetaillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationDetaillComponent]
    });
    fixture = TestBed.createComponent(ReclamationDetaillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
