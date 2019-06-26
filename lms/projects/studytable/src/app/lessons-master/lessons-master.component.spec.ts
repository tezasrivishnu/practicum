import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsMasterComponent } from './lessons-master.component';

describe('LessonsMasterComponent', () => {
  let component: LessonsMasterComponent;
  let fixture: ComponentFixture<LessonsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
