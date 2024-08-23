import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVentasTopComponent } from './grafica-ventas-top.component';

describe('GraficaVentasTopComponent', () => {
  let component: GraficaVentasTopComponent;
  let fixture: ComponentFixture<GraficaVentasTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasTopComponent]
    });
    fixture = TestBed.createComponent(GraficaVentasTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
