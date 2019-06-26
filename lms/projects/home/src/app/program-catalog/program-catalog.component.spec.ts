import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCatalogComponent } from './program-catalog.component';

describe('ProgramCatalogComponent', () => {
  let component: ProgramCatalogComponent;
  let fixture: ComponentFixture<ProgramCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
