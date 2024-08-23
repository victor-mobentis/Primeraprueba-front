import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaVentasHoraComponent } from './grafica-ventas-hora.component';

describe('GraficaVentasHoraComponent', () => {
  let component: GraficaVentasHoraComponent;
  let fixture: ComponentFixture<GraficaVentasHoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasHoraComponent]
    });
    fixture = TestBed.createComponent(GraficaVentasHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
