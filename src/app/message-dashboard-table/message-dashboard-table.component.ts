import { ChangeDetectorRef, Component, OnInit, TrackByFunction } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MessageDashboardTableItemComponent } from './item/item.component';
import { StoreMessage, StoreService } from '../messages/store.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessageDashboardTableListComponent } from './message-dashboard-table-list/message-dashboard-table-list.component';

@Component({
  selector: 'app-message-dashboard-table',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatListModule, MessageDashboardTableItemComponent, MessageDashboardTableListComponent],
  templateUrl: './message-dashboard-table.component.html',
  styleUrl: './message-dashboard-table.component.scss'
})
export class MessageDashboardTableComponent implements OnInit {
  messages!: StoreMessage[];
  numMessages: number = 0;

  private subscription!: Subscription;

  constructor(
    private store: StoreService,
    private ref : ChangeDetectorRef
    ) {
    this.messages = [];
    this.subscription = this.store.messages$.subscribe((messages) => {
      this.messages = messages;
      this.numMessages = messages.length;
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    this.store.add({
      phone: '+17575602155' as StoreMessage['phone'],
      body: 'Hello world!' as StoreMessage['body'],
      sentAt: new Date() as StoreMessage['sentAt'],
    });
    setTimeout(() => {
    }, 1000);
    this.store.messages$.subscribe((messages) => {
      console.log('messages', messages);
    });
  }
}
