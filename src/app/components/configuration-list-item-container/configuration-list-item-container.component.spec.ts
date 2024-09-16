import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationListItemContainerComponent } from './configuration-list-item-container.component';

describe('ConfigurationListItemContainerComponent', () => {
  let component: ConfigurationListItemContainerComponent;
  let fixture: ComponentFixture<ConfigurationListItemContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationListItemContainerComponent]
    });
    fixture = TestBed.createComponent(ConfigurationListItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
