import { Component } from '@angular/core';
import {DatabaseService} from "../../../shared/serivces/database.service";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent {
  public events: Array<Object>;
  constructor(private db: DatabaseService) {
    this.db.getList('events').first().subscribe(d => this.events = d);
  }

  loadImg($event) {
    $event.currentTarget.style.opacity = 1;
  }

}
