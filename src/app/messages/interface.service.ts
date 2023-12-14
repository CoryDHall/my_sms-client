import { Injectable } from '@angular/core';
import { MessagesModule } from './messages.module';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { MessageBase } from '../../models/Message';

/**
 * The `MessagesModule` is a feature module that handles fetching and storing messages.
 * It also provides the `MESSAGE_BODY_MAX_LENGTH` injection token.
 * provides the following methods:
 * - requestAll(onError?, onComplete?): fetches all messages from the server and stores them in the store
 * - sendMessage(message: MessageBase, onError?, onComplete?): creates a new message and stores it in the store
 */
@Injectable({
  providedIn: MessagesModule,
})
export class MessagesInterfaceService {
  constructor(private apiClient: ApiService, private messageStore: StoreService) { }

  /**
   * Fetches all messages from the server and stores them in the store
   */
  requestAll(onError?: <U>(error: U) => void, onComplete?: () => void) {
    this.apiClient.getMessages()
      .subscribe({
        next: messages => {
          this.messageStore.merge(messages)
        },
        error: onError,
        complete: onComplete,
      });
  }

  /**
   * Creates a new message and stores it in the store
   */

  sendMessage(message: MessageBase, onError?: <U>(error: U) => void, onComplete?: () => void) {
    this.apiClient.createMessage(message)
      .subscribe({
        next: message => this.messageStore.add(message),
        error: onError,
        complete: onComplete,
      });
  }
}
