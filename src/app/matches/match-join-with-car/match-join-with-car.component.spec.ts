import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchJoinWithCarComponent } from './match-join-with-car.component';

describe('MatchJoinWithCarComponent', () => {
  let component: MatchJoinWithCarComponent;
  let fixture: ComponentFixture<MatchJoinWithCarComponent>;

  beforeEach(async(() => {
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
