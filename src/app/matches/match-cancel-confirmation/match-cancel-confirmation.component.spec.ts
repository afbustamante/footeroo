import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchCancelConfirmationComponent } from './match-cancel-confirmation.component';

describe('MatchCancelConfirmationComponent', () => {
  let component: MatchCancelConfirmationComponent;
  let fixture: ComponentFixture<MatchCancelConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCancelConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCancelConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
