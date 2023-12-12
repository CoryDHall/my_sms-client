import { Component } from '@angular/core';
import { MAT_CARD_CONFIG, MatCardModule } from '@angular/material/card';
import { MessageDashboardFormComponent } from '../message-dashboard-form/message-dashboard-form.component';
import { MessageDashboardTableComponent } from '../message-dashboard-table/message-dashboard-table.component';

@Component({
  selector: 'app-message-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MessageDashboardFormComponent,
    MessageDashboardTableComponent
  ],
  providers: [
    { provide: MAT_CARD_CONFIG, useValue: { appearance: 'raised' }}
  ],
  templateUrl: './message-dashboard.component.html',
  styleUrl: './message-dashboard.component.scss'
})
export class MessageDashboardComponent {

}
