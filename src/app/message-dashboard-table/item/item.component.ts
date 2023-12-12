import { Component, Host, Inject, Input } from '@angular/core';
import { StoreMessage } from '../../messages/store.service';
import { MESSAGE_BODY_MAX_LENGTH, MessagesModule } from '../../messages/messages.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-dashboard-table-item',
  standalone: true,
  imports: [MessagesModule, DatePipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class MessageDashboardTableItemComponent {
  @Input({ required: true }) message!: StoreMessage;

  constructor(
    @Inject(MESSAGE_BODY_MAX_LENGTH) public MESSAGE_BODY_MAX_LENGTH: number
  ) {}
}
