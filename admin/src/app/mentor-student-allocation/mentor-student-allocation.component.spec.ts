import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorStudentAllocationComponent } from './mentor-student-allocation.component';

describe('MentorStudentAllocationComponent', () => {
  let component: MentorStudentAllocationComponent;
  let fixture: ComponentFixture<MentorStudentAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorStudentAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorStudentAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
