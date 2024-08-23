import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPedidosSegmentacion3Component } from './grafica-pedidos-segmentacion3.component';

describe('GraficaPedidosSegmentacion3Component', () => {
  let component: GraficaPedidosSegmentacion3Component;
  let fixture: ComponentFixture<GraficaPedidosSegmentacion3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosSegmentacion3Component]
    });
    fixture = TestBed.createComponent(GraficaPedidosSegmentacion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
