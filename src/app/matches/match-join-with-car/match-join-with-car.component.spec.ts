import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchJoinWithCarComponent } from './match-join-with-car.component';

describe('MatchJoinWithCarComponent', () => {
  let component: MatchJoinWithCarComponent;
  let fixture: ComponentFixture<MatchJoinWithCarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchJoinWithCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchJoinWithCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
