import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRegistryComponent } from './match-registry.component';

describe('MatchRegistryComponent', () => {
  let component: MatchRegistryComponent;
  let fixture: ComponentFixture<MatchRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
