import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPedidosSegmentacion2Component } from './grafica-pedidos-segmentacion2.component';

describe('GraficaPedidosSegmentacion2Component', () => {
  let component: GraficaPedidosSegmentacion2Component;
  let fixture: ComponentFixture<GraficaPedidosSegmentacion2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosSegmentacion2Component]
    });
    fixture = TestBed.createComponent(GraficaPedidosSegmentacion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
