import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVentasSegmentacion2Component } from './grafica-ventas-segmentacion2.component';

describe('GraficaVentasSegmentacion2Component', () => {
  let component: GraficaVentasSegmentacion2Component;
  let fixture: ComponentFixture<GraficaVentasSegmentacion2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasSegmentacion2Component]
    });
    fixture = TestBed.createComponent(GraficaVentasSegmentacion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
