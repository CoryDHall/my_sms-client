import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { BodyLengthComponent } from '../message-dashboard/body-length/body-length.component';
import { MessagesModule } from '../messages/messages.module';
import { MessagesInterfaceService } from '../messages/interface.service';
import { MessageBase } from '../../models/Message';
type NullablePartial<T> = {
  [P in keyof T]?: T[P] | null;
};
@Component({
  selector: 'app-message-dashboard-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, BodyLengthComponent, MatButtonModule],
  templateUrl: './message-dashboard-form.component.html',
  styleUrl: './message-dashboard-form.component.scss'
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
        this.clearForm();
        this.enableForm();
      });
      this.disableForm()
    }
  }

  get messageBody() { return this.messageForm.get('body')?.value ?? ''; }

  clearForm(): void {
    this.messageForm.reset();
  }

  disableForm(): void {
    this.messageForm.disable();
  }

  enableForm(): void {
    this.messageForm.enable();
  }

  private validateFormValue(message: NullablePartial<MessageBase>): message is MessageBase {
    return !!message.phone_number && !!message.body;
  }
}
