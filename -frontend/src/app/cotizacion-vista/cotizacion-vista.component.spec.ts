import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionVistaComponent } from './cotizacion-vista.component';

describe('CotizacionVistaComponent', () => {
  let component: CotizacionVistaComponent;
  let fixture: ComponentFixture<CotizacionVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionVistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizacionVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
