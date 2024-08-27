import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsContactComponent } from './clients-contact.component';

describe('ClientsContactComponent', () => {
  let component: ClientsContactComponent;
  let fixture: ComponentFixture<ClientsContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsContactComponent]
    });
    fixture = TestBed.createComponent(ClientsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
