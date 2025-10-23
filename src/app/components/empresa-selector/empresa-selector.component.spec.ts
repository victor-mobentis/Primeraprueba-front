import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaSelectorComponent } from './empresa-selector.component';

describe('EmpresaSelectorComponent', () => {
  let component: EmpresaSelectorComponent;
  let fixture: ComponentFixture<EmpresaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
