import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaVentasMesComponent } from './grafica-ventas-mes.component';

describe('GraficaVentasMesComponent', () => {
  let component: GraficaVentasMesComponent;
  let fixture: ComponentFixture<GraficaVentasMesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaVentasMesComponent]
    });
    fixture = TestBed.createComponent(GraficaVentasMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
