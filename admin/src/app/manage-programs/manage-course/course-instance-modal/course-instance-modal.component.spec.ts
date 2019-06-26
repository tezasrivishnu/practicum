import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInstanceModalComponent } from './course-instance-modal.component';

describe('CourseInstanceModalComponent', () => {
  let component: CourseInstanceModalComponent;
  let fixture: ComponentFixture<CourseInstanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInstanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInstanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
