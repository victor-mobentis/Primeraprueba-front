import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVentasSegmentacion1Component } from './grafica-ventas-segmentacion1.component';

describe('GraficaVentasSegmentacion1Component', () => {
  let component: GraficaVentasSegmentacion1Component;
  let fixture: ComponentFixture<GraficaVentasSegmentacion1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasSegmentacion1Component]
    });
    fixture = TestBed.createComponent(GraficaVentasSegmentacion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
