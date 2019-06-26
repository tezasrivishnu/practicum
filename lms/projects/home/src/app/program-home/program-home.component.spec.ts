import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramHomeComponent } from './program-home.component';

describe('ProgramHomeComponent', () => {
  let component: ProgramHomeComponent;
  let fixture: ComponentFixture<ProgramHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
