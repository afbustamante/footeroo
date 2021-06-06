import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchSearchComponent } from './match-search.component';

describe('MatchSearchComponent', () => {
  let component: MatchSearchComponent;
  let fixture: ComponentFixture<MatchSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
