import { Component, Host, Inject, Input } from '@angular/core';
import { StoreMessage } from '../../messages/store.service';
import { MESSAGE_BODY_MAX_LENGTH, MessagesModule } from '../../messages/messages.module';
import { DatePipe } from '@angular/common';
import { BodyLengthComponent } from '../../message-dashboard/body-length/body-length.component';

@Component({
  selector: 'app-message-dashboard-table-item',
  standalone: true,
  imports: [MessagesModule, DatePipe, BodyLengthComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class MessageDashboardTableItemComponent {
  @Input({ required: true }) message!: StoreMessage;
}
