import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioCapturaComponent } from './directorio-captura.component';

describe('DirectorioCapturaComponent', () => {
  let component: DirectorioCapturaComponent;
  let fixture: ComponentFixture<DirectorioCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioCapturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorioCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
