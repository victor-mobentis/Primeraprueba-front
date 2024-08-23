import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaClientesComponent } from './grafica-clientes.component';

describe('GraficaClientesComponent', () => {
  let component: GraficaClientesComponent;
  let fixture: ComponentFixture<GraficaClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaClientesComponent]
    });
    fixture = TestBed.createComponent(GraficaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
