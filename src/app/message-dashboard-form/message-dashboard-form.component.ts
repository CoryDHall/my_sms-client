import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BodyLengthComponent } from '../message-dashboard/body-length/body-length.component';
import { MessagesInterfaceService } from '../messages/interface.service';
import { MessageBase } from '../../models/Message';
import { CommonModule } from '@angular/common';
type NullablePartial<T> = {
  [P in keyof T]?: T[P] | null;
};
@Component({
  selector: 'app-message-dashboard-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BodyLengthComponent,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './message-dashboard-form.component.html',
  styleUrl: './message-dashboard-form.component.scss',
})
export class MessageDashboardFormComponent {
  messageForm = new FormGroup({
    phone_number: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    body: new FormControl('', [
      Validators.required,
    ]),
  })

  inProgress = false;

  constructor(private messageInterface: MessagesInterfaceService) {}

  onSubmit(): void {
    const formValue = this.messageForm.value as NullablePartial<MessageBase>;
    console.log(formValue);
    if (this.validateFormValue(formValue)) {
      this.messageInterface.sendMessage(formValue, (err) => {
        if (err) {
          console.error(err);
        }
        this.enableForm();
      }, () => {
        this.clearForm(true);
        this.enableForm();
      });
      this.disableForm()
    }
  }

  get messageBody() { return this.messageForm.get('body')?.value ?? ''; }

  clearForm(onlyBody?: boolean): void {
    this.messageForm.reset({
      body: '',
      ...onlyBody ? { phone_number: this.messageForm.value.phone_number } : { phone_number: '' },
    });
    this.messageForm.markAsUntouched();
  }

  disableForm(): void {
    this.inProgress = true;
    this.messageForm.disable();
  }

  enableForm(): void {
    this.inProgress = false;
    this.messageForm.enable();
  }

  private validateFormValue(message: NullablePartial<MessageBase>): message is MessageBase {
    return !!message.phone_number && !!message.body;
  }
}
