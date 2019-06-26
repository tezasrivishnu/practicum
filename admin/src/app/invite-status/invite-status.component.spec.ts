import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteStatusComponent } from './invite-status.component';

describe('InviteStatusComponent', () => {
  let component: InviteStatusComponent;
  let fixture: ComponentFixture<InviteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
