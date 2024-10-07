import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaSemiCirculoComponent } from './grafica-semi-circulo.component';

describe('GraficaSemiCirculoComponent', () => {
  let component: GraficaSemiCirculoComponent;
  let fixture: ComponentFixture<GraficaSemiCirculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaSemiCirculoComponent]
    });
    fixture = TestBed.createComponent(GraficaSemiCirculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
