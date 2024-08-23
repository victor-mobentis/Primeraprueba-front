import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPedidosComponent } from './grafica-pedidos.component';

describe('GraficaPedidosComponent', () => {
  let component: GraficaPedidosComponent;
  let fixture: ComponentFixture<GraficaPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosComponent]
    });
    fixture = TestBed.createComponent(GraficaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
