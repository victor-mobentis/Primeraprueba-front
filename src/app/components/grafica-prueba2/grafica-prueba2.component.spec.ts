import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPrueba2Component } from './grafica-prueba2.component';

describe('GraficaPrueba2Component', () => {
  let component: GraficaPrueba2Component;
  let fixture: ComponentFixture<GraficaPrueba2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaPrueba2Component]
    });
    fixture = TestBed.createComponent(GraficaPrueba2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
