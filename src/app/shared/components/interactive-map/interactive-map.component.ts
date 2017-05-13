import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../../shared/serivces/database.service'; 
import {Router} from "@angular/router";

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {
  lat = 50.45466;
  lng = 30.5238;
  events: any;

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getList('events')
      .subscribe((events) => {
        this.events = events;
      });
  }

  goToEvent (event) {
    this.router.navigate(['app', 'event', event.$key]);
  }

}
