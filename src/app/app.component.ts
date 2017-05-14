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
    const theme = localStorage.getItem('theme') === 'true';
    console.log(theme);
    if (theme) {
      this.changeColorScheme(theme);
    }
  }

  changeColorScheme(value) {
    const [one, two] = [document.getElementById('1'), document.getElementById('2')];
    const swapElements = (elm1, elm2) => {
      const
          parent1 = elm1.parentNode,
          next1   = elm1.nextSibling,
          parent2 = elm2.parentNode,
          next2   = elm2.nextSibling;

      parent1.insertBefore(elm2, next1);
      parent2.insertBefore(elm1, next2);
    };

    value.checked ? swapElements(one, two) : swapElements(two, one);
  }
}
