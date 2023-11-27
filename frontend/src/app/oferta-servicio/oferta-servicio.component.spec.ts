import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaServicioComponent } from './oferta-servicio.component';

describe('OfertaServicioComponent', () => {
  let component: OfertaServicioComponent;
  let fixture: ComponentFixture<OfertaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
