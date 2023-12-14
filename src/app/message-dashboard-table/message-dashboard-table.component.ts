import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MessageDashboardTableItemComponent } from './item/item.component';
import { StoreMessage, StoreService } from '../messages/store.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  MessageDashboardTableListComponent,
} from './message-dashboard-table-list/message-dashboard-table-list.component';

@Component({
  selector: 'app-message-dashboard-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MessageDashboardTableItemComponent,
    MessageDashboardTableListComponent,
  ],
  templateUrl: './message-dashboard-table.component.html',
  styleUrl: './message-dashboard-table.component.scss',
})
export class MessageDashboardTableComponent implements OnInit {
  messages!: StoreMessage[];
  private readonly MESSAGE_SORT = (a: StoreMessage, b: StoreMessage): number => b.sentAt.getTime() - a.sentAt.getTime();

  get numMessages(): number {
    return this.messages.length;
  }

  private subscription!: Subscription;

  constructor(
    private store: StoreService,
    private ref : ChangeDetectorRef,
  ) {
    this.messages = [];
    this.subscription = this.store.messages$.subscribe((messages) => {
      this.messages = messages.sort(this.MESSAGE_SORT);
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    this.store.messages$.subscribe((messages) => {
      console.log('messages', messages);
    });
  }
}
