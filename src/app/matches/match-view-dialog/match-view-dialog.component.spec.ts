import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchViewDialogComponent } from './match-view-dialog.component';

describe('MatchViewDialogComponent', () => {
  let component: MatchViewDialogComponent;
  let fixture: ComponentFixture<MatchViewDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
