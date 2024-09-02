import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaMotivosComponent } from './grafica-motivos.component';

describe('GraficaMotivosComponent', () => {
  let component: GraficaMotivosComponent;
  let fixture: ComponentFixture<GraficaMotivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaMotivosComponent]
    });
    fixture = TestBed.createComponent(GraficaMotivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
