import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySelectorConfigComponent } from './company-selector-config.component';

describe('CompanySelectorConfigComponent', () => {
  let component: CompanySelectorConfigComponent;
  let fixture: ComponentFixture<CompanySelectorConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySelectorConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySelectorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
