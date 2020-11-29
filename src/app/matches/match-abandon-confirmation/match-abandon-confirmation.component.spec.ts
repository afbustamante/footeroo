import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAbandonConfirmationComponent } from './match-abandon-confirmation.component';

describe('MatchAbandonConfirmationComponent', () => {
  let component: MatchAbandonConfirmationComponent;
  let fixture: ComponentFixture<MatchAbandonConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchAbandonConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAbandonConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
