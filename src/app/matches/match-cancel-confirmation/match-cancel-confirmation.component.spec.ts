import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCancelConfirmationComponent } from './match-cancel-confirmation.component';

describe('MatchCancelConfirmationComponent', () => {
  let component: MatchCancelConfirmationComponent;
  let fixture: ComponentFixture<MatchCancelConfirmationComponent>;

  beforeEach(async(() => {
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
