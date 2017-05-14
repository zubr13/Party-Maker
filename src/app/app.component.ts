import { Component } from '@angular/core';
import { ServiceWorkerService } from './shared/serivces/service-worker.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sws: ServiceWorkerService) {
    // Remove comments for testing notifications
    // this.sws.initNotification();
  }
}
