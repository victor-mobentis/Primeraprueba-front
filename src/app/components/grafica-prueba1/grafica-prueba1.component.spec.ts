import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPrueba1Component } from './grafica-prueba1.component';

describe('GraficaPrueba1Component', () => {
  let component: GraficaPrueba1Component;
  let fixture: ComponentFixture<GraficaPrueba1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPrueba1Component]
    });
    fixture = TestBed.createComponent(GraficaPrueba1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
