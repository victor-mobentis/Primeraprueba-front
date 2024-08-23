import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaVentasSegmentacion3Component } from './grafica-ventas-segmentacion3.component';

describe('GraficaVentasSegmentacion3Component', () => {
  let component: GraficaVentasSegmentacion3Component;
  let fixture: ComponentFixture<GraficaVentasSegmentacion3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasSegmentacion3Component]
    });
    fixture = TestBed.createComponent(GraficaVentasSegmentacion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
