import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaVentasFamiliasProductosComponent } from './grafica-ventas-familias-productos.component';

describe('GraficaVentasFamiliasProductosComponent', () => {
  let component: GraficaVentasFamiliasProductosComponent;
  let fixture: ComponentFixture<GraficaVentasFamiliasProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasFamiliasProductosComponent]
    });
    fixture = TestBed.createComponent(GraficaVentasFamiliasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
