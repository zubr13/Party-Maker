import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../../shared/serivces/database.service';
import {Router} from "@angular/router";
import {FacebookService} from 'ng2-facebook-sdk';
import {AuthService} from './../../../shared/serivces/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  events = [];
  filteredEvents = [];
  lat: any;
  lng: any;
  center = {
    latitude: 50,
    longtitude: 50
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
    radius: 1000,
    data: null
  };

  constructor(private db: DatabaseService, private router: Router, private fb: FacebookService,
              private authService: AuthService) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
    this.db.getList('events')
      .subscribe((events) => {
        this.events = events;
        this.fb.init({
          appId: '1955507991402224',
          version: 'v2.9'
        });
        this.fb.api(`/search?q=Kyiv&type=event&limit=1000&access_token=${this.authService.facebookToken}`)
          .then((fbEvents) => {
            fbEvents.data.map(event => {
              if (event.place && event.place.location) {
                event.longtitude = event.place.location.longitude;
                event.latitude = event.place.location.latitude;
                event.$key = event.id;
              }
              return event;
            })
            this.events.push(...fbEvents.data);
            this.center = {
              latitude: this.lat,
              longtitude: this.lng
            }
            this.filterEvents();
          });
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
