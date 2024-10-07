import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBarraVerticalComponent } from './grafica-barra-vertical.component';

describe('GraficaBarraVerticalComponent', () => {
  let component: GraficaBarraVerticalComponent;
  let fixture: ComponentFixture<GraficaBarraVerticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaBarraVerticalComponent]
    });
    fixture = TestBed.createComponent(GraficaBarraVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
