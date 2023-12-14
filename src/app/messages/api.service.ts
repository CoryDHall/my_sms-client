import { Injectable } from '@angular/core';
import { MessagesModule } from './messages.module';
import { ApiHttpService } from 'ngx-api-utils';
import { MessageBase, MessageResponse } from '../../models/Message';
import { map } from 'rxjs';

@Injectable({
  providedIn: MessagesModule,
})
export class ApiService {
  static baseUrl = '//localhost:3030/messages'

  private readonly MESSAGE_XFORM = (message: MessageResponse): MessageResponse => ({
    ...message,
    sentAt: new Date(message.sentAt),
  });

  private readonly MAP_MESSAGES = map<MessageResponse[], MessageResponse[]>(messages =>
    messages.map(this.MESSAGE_XFORM),
  );

  private readonly HTTP_OPTIONS = { withCredentials: true };

  constructor(private http: ApiHttpService) { }

  getMessages() {
    return this.http
      .get<MessageResponse[]>(ApiService.baseUrl, this.HTTP_OPTIONS)
      .pipe(this.MAP_MESSAGES);
  }

  createMessage(message: MessageBase) {
    return this.http.post<MessageResponse>( ApiService.baseUrl,{ message }, this.HTTP_OPTIONS)
      .pipe(map(this.MESSAGE_XFORM));
  }
}
