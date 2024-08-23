import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPedidosHoraComponent } from './grafica-pedidos-hora.component';

describe('GraficaPedidosHoraComponent', () => {
  let component: GraficaPedidosHoraComponent;
  let fixture: ComponentFixture<GraficaPedidosHoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosHoraComponent]
    });
    fixture = TestBed.createComponent(GraficaPedidosHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
