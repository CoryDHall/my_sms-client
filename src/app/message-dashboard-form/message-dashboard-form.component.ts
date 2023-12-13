import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { BodyLengthComponent } from '../message-dashboard/body-length/body-length.component';

@Component({
  selector: 'app-message-dashboard-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, BodyLengthComponent, MatButtonModule],
  templateUrl: './message-dashboard-form.component.html',
  styleUrl: './message-dashboard-form.component.scss'
})
export class MessageDashboardFormComponent {
  messageForm = new FormGroup({
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    body: new FormControl('', [
      Validators.required,
    ]),
  })

  onSubmit(): void {
    console.log(this.messageForm.value);
  }

  get messageBody() { return this.messageForm.get('body')?.value ?? ''; }
}
