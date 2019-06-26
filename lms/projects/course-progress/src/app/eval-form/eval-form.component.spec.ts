import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalFormComponent } from './eval-form.component';

describe('EvalFormComponent', () => {
  let component: EvalFormComponent;
  let fixture: ComponentFixture<EvalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
