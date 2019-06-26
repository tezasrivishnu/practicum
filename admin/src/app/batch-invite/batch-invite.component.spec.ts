import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchInviteComponent } from './batch-invite.component';

describe('BatchInviteComponent', () => {
  let component: BatchInviteComponent;
  let fixture: ComponentFixture<BatchInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
