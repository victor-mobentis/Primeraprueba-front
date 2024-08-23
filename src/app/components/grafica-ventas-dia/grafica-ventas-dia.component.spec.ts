import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaVentasDiaComponent } from './grafica-ventas-dia.component';

describe('GraficaVentasDiaComponent', () => {
  let component: GraficaVentasDiaComponent;
  let fixture: ComponentFixture<GraficaVentasDiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasDiaComponent]
    });
    fixture = TestBed.createComponent(GraficaVentasDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
