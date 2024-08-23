import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPedidosDiaComponent } from './grafica-pedidos-dia.component';

describe('GraficaPedidosDiaComponent', () => {
  let component: GraficaPedidosDiaComponent;
  let fixture: ComponentFixture<GraficaPedidosDiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosDiaComponent]
    });
    fixture = TestBed.createComponent(GraficaPedidosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
