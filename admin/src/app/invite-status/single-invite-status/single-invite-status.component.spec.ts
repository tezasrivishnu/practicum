import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInviteStatusComponent } from './single-invite-status.component';

describe('SingleInviteStatusComponent', () => {
  let component: SingleInviteStatusComponent;
  let fixture: ComponentFixture<SingleInviteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleInviteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleInviteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
