import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchJoinWithoutCarComponent } from './match-join-without-car.component';

describe('MatchJoinWithoutCarComponent', () => {
  let component: MatchJoinWithoutCarComponent;
  let fixture: ComponentFixture<MatchJoinWithoutCarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchJoinWithoutCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchJoinWithoutCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
