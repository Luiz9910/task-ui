import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfirmationDeleteComponent } from './button-confirmation-delete.component';

describe('ButtonConfimationDeleteComponent', () => {
  let component: ButtonConfirmationDeleteComponent;
  let fixture: ComponentFixture<ButtonConfirmationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonConfirmationDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
