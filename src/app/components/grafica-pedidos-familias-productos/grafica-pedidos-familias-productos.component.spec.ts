import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaPedidosFamiliasProductosComponent } from './grafica-pedidos-familias-productos.component';

describe('GraficaPedidosFamiliasProductosComponent', () => {
  let component: GraficaPedidosFamiliasProductosComponent;
  let fixture: ComponentFixture<GraficaPedidosFamiliasProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosFamiliasProductosComponent]
    });
    fixture = TestBed.createComponent(GraficaPedidosFamiliasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
