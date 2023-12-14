import { Injectable } from '@angular/core';
import { MessagesModule } from './messages.module';
import { MessageResponse } from '../../models/Message';
import { Observable, Subject, debounceTime } from 'rxjs';

export type StoreMessage = Omit<MessageResponse, 'id' | 'status'>;
export type StoreMessageMatcher = (message: StoreMessage) => boolean;
export type StoreMessageUpdater = (message: StoreMessage) => StoreMessage;

const createMatcher = <U extends Partial<StoreMessage>>(matcher: U): StoreMessageMatcher => {
  const keys = Object.keys(matcher) as (keyof StoreMessage)[];
  return (message) => keys.every((key) => message[key] === matcher[key]);
};

const createUpdater = <U extends Partial<StoreMessage>>(updater: U): StoreMessageUpdater => {
  const keys = Object.keys(updater) as (keyof StoreMessage)[];
  return (message) => keys.reduce((acc, key) => ({ ...acc, [key]: updater[key] }), message);
};

export type StoreMessageMatchArg = StoreMessageMatcher | Partial<StoreMessage>;
/**
 * The store service is responsible for managing the state of the messages
 * in the application. It is a singleton service that is provided in the
 * MessagesModule.
 */
@Injectable({
  providedIn: MessagesModule,
})
export class StoreService {
  private messages: StoreMessage[] = [];
  private messagesSubject: Subject<StoreMessage[]> = new Subject<StoreMessage[]>();

  /**
   * Returns an Observable that emits the current messages array
   */
  messages$: Observable<StoreMessage[]> = this.messagesSubject.asObservable().pipe(debounceTime(10));

  constructor() { }

  /**
   * Returns all messages in the store
   */
  all(): StoreMessage[] {
    return this.messages;
  }

  /**
   * Adds a message to the store
   */
  add(message: StoreMessage): void;
  /**
   * Adds several messages to the store
   */
  add(messages: StoreMessage[]): void;
  /**
   * Adds a message or several messages to the store
   */
  add(message: StoreMessage | StoreMessage[]): void {
    if (Array.isArray(message)) {
      this.messages.push(...message);
    } else {
      this.messages.push(message);
    }
    this.notifyMessageUpdate();
  }

  private notifyMessageUpdate() {
    this.messagesSubject.next(this.messages);
  }

  /**
   * Updates one or more messages in the store
   */
  update(
    matcher: StoreMessageMatchArg,
    updater: StoreMessageUpdater | Partial<StoreMessage>,
    once: boolean = false,
  ): number {
    const matchFn = typeof matcher === 'function' ? matcher : createMatcher(matcher);
    const updateFn = typeof updater === 'function' ? updater : createUpdater(updater);
    let count = 0;
    this.messages = this.messages.map((message) => {
      if (!(once && count) && matchFn(message)) {
        count++;
        return updateFn(message);
      }
      return message;
    });
    if (count) {
      this.notifyMessageUpdate();
    }
    return count;
  }

  /**
   * Removes one or more messages from the store
   */

  remove(matcher: StoreMessageMatchArg, once: boolean = false): number {
    const matchFn = typeof matcher === 'function' ? matcher : createMatcher(matcher);
    let count = 0;
    this.messages = this.messages.filter((message) => {
      if (!(once && count) && matchFn(message)) {
        count++;
        return false;
      }
      return true;
    });
    if (count) {
      this.notifyMessageUpdate();
    }
    return count;
  }

  /**
   * Removes all messages from the store
   */
  clear(): void {
    this.messages = [];
    this.notifyMessageUpdate();
  }

  /**
   * Update matching message or add it if it doesn't exist
   */
  upsert(matcher: StoreMessageMatchArg, updater: StoreMessageUpdater | Partial<StoreMessage>): void {
    if (!this.update(matcher, updater, true)) {
      this.add(updater as StoreMessage);
    }
  }

  /**
   * Merge messages into the store
   */
  merge(messages: StoreMessage[], matchFactory?: (message: Partial<StoreMessage>) => StoreMessageMatchArg): void {
    messages.forEach((message) => this.upsert(matchFactory ? matchFactory(message) : message, message));
  }
}
