import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDropdownComponent } from './empresa-dropdown.component';

describe('EmpresaDropdownComponent', () => {
  let component: EmpresaDropdownComponent;
  let fixture: ComponentFixture<EmpresaDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
