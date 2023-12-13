import { Inject, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { StoreService } from './store.service';
import { MessageBase } from '../../models/Message';

export const MESSAGE_BODY_MAX_LENGTH = new InjectionToken<number>('MESSAGE_BODY_MAX_LENGTH');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: MESSAGE_BODY_MAX_LENGTH, useValue: 260 }
  ],
})
export class MessagesModule {
}
