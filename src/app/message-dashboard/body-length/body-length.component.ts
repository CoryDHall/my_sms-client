import { Component, Inject, Input } from '@angular/core';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { MESSAGE_BODY_MAX_LENGTH } from '../../messages/messages.module';

@Component({
  selector: 'app-body-length',
  standalone: true,
  imports: [],
  templateUrl: './body-length.component.html',
})
export class BodyLengthComponent {
  @Input({ required: true }) body!: string;

  get length(): number {
    return this.body.length;
  }

  constructor(
    @Inject(MESSAGE_BODY_MAX_LENGTH) public MESSAGE_BODY_MAX_LENGTH: number,
  ) {}
}
