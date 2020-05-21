import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCarpoolComponent } from './match-carpool.component';

describe('MatchCarpoolComponent', () => {
  let component: MatchCarpoolComponent;
  let fixture: ComponentFixture<MatchCarpoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCarpoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCarpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
