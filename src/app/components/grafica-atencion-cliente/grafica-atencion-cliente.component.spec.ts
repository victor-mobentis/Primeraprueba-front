import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficaAtencionClienteComponent } from './grafica-atencion-cliente.component';

describe('GraficaAtencionClienteComponent', () => {
  let component: GraficaAtencionClienteComponent;
  let fixture: ComponentFixture<GraficaAtencionClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaAtencionClienteComponent]
    });
    fixture = TestBed.createComponent(GraficaAtencionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
