import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaPedidosMesComponent } from './grafica-pedidos-mes.component';

describe('GraficaPedidosMesComponent', () => {
  let component: GraficaPedidosMesComponent;
  let fixture: ComponentFixture<GraficaPedidosMesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPedidosMesComponent]
    });
    fixture = TestBed.createComponent(GraficaPedidosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
