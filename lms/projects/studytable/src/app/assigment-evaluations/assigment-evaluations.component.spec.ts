import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentEvaluationsComponent } from './assigment-evaluations.component';

describe('AssigmentEvaluationsComponent', () => {
  let component: AssigmentEvaluationsComponent;
  let fixture: ComponentFixture<AssigmentEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigmentEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigmentEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
