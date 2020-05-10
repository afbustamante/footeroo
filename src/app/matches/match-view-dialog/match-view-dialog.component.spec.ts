import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchViewDialogComponent } from './match-view-dialog.component';

describe('MatchViewDialogComponent', () => {
  let component: MatchViewDialogComponent;
  let fixture: ComponentFixture<MatchViewDialogComponent>;

  beforeEach(async(() => {
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
