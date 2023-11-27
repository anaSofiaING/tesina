import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioDetailsComponent } from './directorio-details.component';

describe('DirectorioDetailsComponent', () => {
  let component: DirectorioDetailsComponent;
  let fixture: ComponentFixture<DirectorioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorioDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
