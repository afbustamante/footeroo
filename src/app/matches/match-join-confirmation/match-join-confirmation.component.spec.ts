import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchJoinConfirmationComponent } from './match-join-confirmation.component';

describe('MatchJoinConfirmationComponent', () => {
  let component: MatchJoinConfirmationComponent;
  let fixture: ComponentFixture<MatchJoinConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchJoinConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchJoinConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
