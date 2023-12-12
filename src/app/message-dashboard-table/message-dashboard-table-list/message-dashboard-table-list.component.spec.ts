import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDashboardTableListComponent } from './message-dashboard-table-list.component';

describe('MessageDashboardTableListComponent', () => {
  let component: MessageDashboardTableListComponent;
  let fixture: ComponentFixture<MessageDashboardTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageDashboardTableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageDashboardTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
