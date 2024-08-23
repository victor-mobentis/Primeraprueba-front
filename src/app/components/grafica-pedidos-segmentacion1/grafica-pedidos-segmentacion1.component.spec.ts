import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPedidosSegmentacion1Component } from './grafica-pedidos-segmentacion1.component';

describe('GraficaPedidosSegmentacion1Component', () => {
  let component: GraficaPedidosSegmentacion1Component;
  let fixture: ComponentFixture<GraficaPedidosSegmentacion1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosSegmentacion1Component]
    });
    fixture = TestBed.createComponent(GraficaPedidosSegmentacion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
