import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrePlusProcheComponent } from './centre-plus-proche.component';

describe('CentrePlusProcheComponent', () => {
  let component: CentrePlusProcheComponent;
  let fixture: ComponentFixture<CentrePlusProcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentrePlusProcheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrePlusProcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
