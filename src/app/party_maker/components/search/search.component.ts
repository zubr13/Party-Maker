import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../../shared/serivces/database.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  events = [];
  filteredEvents = [];
  lat = 50.45466;
  lng = 30.5238;
  center = {
    latitude: this.lat,
    longtitude: this.lng
  };

  searchQuery = "Kitten's show";
  options = {
    time: null,
    duration: 0,
    category: [
      {
        name: 'Concert',
        value: true
      },
      {
        name: 'Theatre',
        value: true
      },
      {
        name: 'Meeting',
        value: true
      },
    ],
    price: {
        isFree: false,
        value: 2
    },
    radius: 500,
    data: null
  };

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.getList('events')
      .subscribe((events) => {
        this.events = events;
        this.filteredEvents = this.events;
      });
  }

  onRadiusChange (event) {
    this.options.radius = event;
    this.filterEvents();
  }

  onCenterChange (event) {
    this.center.latitude = event.lat;
    this.center.longtitude = event.lng;
    this.filterEvents();
  }

  filterEvents () {
    this.filteredEvents = this.events.filter(
      (event) => this.getDistance(this.center.longtitude, event.longtitude,
                this.center.latitude, event.latitude) < this.options.radius);
  }

  rad (x) {
    return x * Math.PI / 180;
  }
  getDistance (lon1, lon2, lat1, lat2) {
    const R = 6378137;
    const dLat = this.rad(lat2 - lat1);
    const dLong = this.rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  goToEvent (event) {
    this.router.navigate(['/app', 'event', event.$key, 'info']);
  }

}
