import { Injectable } from '@angular/core';
import { MessagesModule } from './messages.module';
import { MessageResponse } from '../../models/Message';
import { Observable, Subject, distinctUntilChanged } from 'rxjs';

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

/**
 * The store service is responsible for managing the state of the messages
 * in the application. It is a singleton service that is provided in the
 * MessagesModule.
 *
 * provides the following methods:
 * - all(): returns all messages in the store
 * - add(message: StoreMessage): adds a message to the store
 * - add(messages: StoreMessage[]): adds several messages to the store
 * - update(matcher: StoreMessageMatcher | Partial<StoreMessage>, updater: StoreMessageUpdater| Partial<StoreMessage>, once?: boolean): updates one or more messages in the store
 * - remove(matcher: StoreMessageMatcher | Partial<StoreMessage>, once?: boolean): removes one or more messages from the store
 * - clear(): removes all messages from the store
 */
@Injectable({
  providedIn: MessagesModule
})
export class StoreService {
  private messages: StoreMessage[] = [];
  private messagesSubject: Subject<StoreMessage[]> = new Subject<StoreMessage[]>();

  /**
   * Returns an Observable that emits the current messages array
   */
  messages$: Observable<StoreMessage[]> = this.messagesSubject.asObservable();

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
  update(matcher: StoreMessageMatcher | Partial<StoreMessage>, updater: StoreMessageUpdater | Partial<StoreMessage>, once: boolean = false): number {
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
    this.notifyMessageUpdate();
    return count;
  }

  /**
   * Removes one or more messages from the store
   */

  remove(matcher: StoreMessageMatcher | Partial<StoreMessage>, once: boolean = false): number {
    const matchFn = typeof matcher === 'function' ? matcher : createMatcher(matcher);
    let count = 0;
    this.messages = this.messages.filter((message) => {
      if (!(once && count) && matchFn(message)) {
        count++;
        return false;
      }
      return true;
    });
    this.notifyMessageUpdate();
    return count;
  }

  /**
   * Removes all messages from the store
   */
  clear(): void {
    this.messages = [];
    this.notifyMessageUpdate();
  }

}
