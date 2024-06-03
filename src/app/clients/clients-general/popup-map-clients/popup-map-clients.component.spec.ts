import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMapClientsComponent } from './popup-map-clients.component';

describe('PopupMapClientsComponent', () => {
  let component: PopupMapClientsComponent;
  let fixture: ComponentFixture<PopupMapClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupMapClientsComponent]
    });
    fixture = TestBed.createComponent(PopupMapClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
