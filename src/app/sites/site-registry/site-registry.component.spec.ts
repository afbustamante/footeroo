import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRegistryComponent } from './site-registry.component';

describe('SiteRegistryComponent', () => {
  let component: SiteRegistryComponent;
  let fixture: ComponentFixture<SiteRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
