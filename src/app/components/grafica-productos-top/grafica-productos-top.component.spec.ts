import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaProductosTopComponent } from './grafica-productos-top.component';

describe('GraficaProductosTopComponent', () => {
  let component: GraficaProductosTopComponent;
  let fixture: ComponentFixture<GraficaProductosTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaProductosTopComponent]
    });
    fixture = TestBed.createComponent(GraficaProductosTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
