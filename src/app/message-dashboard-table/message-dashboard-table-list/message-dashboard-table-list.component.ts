import { Component, Input } from '@angular/core';
import { StoreMessage } from '../../messages/store.service';
import { MessageDashboardTableItemComponent } from '../item/item.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-message-dashboard-table-list',
  standalone: true,
  imports: [MessageDashboardTableItemComponent, MatListModule],
  templateUrl: './message-dashboard-table-list.component.html',
  styleUrl: './message-dashboard-table-list.component.scss',
})
export class MessageDashboardTableListComponent {
  @Input({ required: true }) messages!: StoreMessage[];
}
