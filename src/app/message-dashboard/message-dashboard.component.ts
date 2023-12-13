import { Component, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { MAT_CARD_CONFIG, MatCardModule } from '@angular/material/card';
import { MessageDashboardFormComponent } from '../message-dashboard-form/message-dashboard-form.component';
import { MessageDashboardTableComponent } from '../message-dashboard-table/message-dashboard-table.component';
import { MessagesInterfaceService } from '../messages/interface.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-message-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MessageDashboardFormComponent,
    MessageDashboardTableComponent
  ],
  providers: [
    { provide: MAT_CARD_CONFIG, useValue: { appearance: 'raised' } }
  ],
  templateUrl: './message-dashboard.component.html',
  styleUrl: './message-dashboard.component.scss'
})
export class MessageDashboardComponent implements AfterViewInit {

  constructor(
    private messagesInterface: MessagesInterfaceService,
    private ref: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string,
  ) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.messagesInterface.requestAll((err) => {
        if (err) {
          console.error(err);
        }
        this.ref.detectChanges();
      }, () => {
        console.log('success');
        this.ref.detectChanges();
      });
    }
  }

}
