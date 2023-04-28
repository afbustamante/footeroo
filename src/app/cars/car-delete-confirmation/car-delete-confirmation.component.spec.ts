import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDeleteConfirmationComponent } from './car-delete-confirmation.component';

describe('CarDeleteConfirmationComponent', () => {
  let component: CarDeleteConfirmationComponent;
  let fixture: ComponentFixture<CarDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
