import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInvitesComponent } from './course-invites.component';

describe('CourseInvitesComponent', () => {
  let component: CourseInvitesComponent;
  let fixture: ComponentFixture<CourseInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
