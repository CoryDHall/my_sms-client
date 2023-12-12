import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDashboardTableComponent } from './message-dashboard-table.component';

describe('MessageDashboardTableComponent', () => {
  let component: MessageDashboardTableComponent;
  let fixture: ComponentFixture<MessageDashboardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageDashboardTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
