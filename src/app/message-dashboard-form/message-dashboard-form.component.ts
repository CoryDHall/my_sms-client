import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-message-dashboard-form',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './message-dashboard-form.component.html',
  styleUrl: './message-dashboard-form.component.scss'
})
export class MessageDashboardFormComponent {

}
