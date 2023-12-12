import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDashboardFormComponent } from './message-dashboard-form.component';

describe('MessageDashboardFormComponent', () => {
  let component: MessageDashboardFormComponent;
  let fixture: ComponentFixture<MessageDashboardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageDashboardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageDashboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
