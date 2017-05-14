import {Component, OnInit, SimpleChanges} from '@angular/core';
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
  center:any = {};

  options = {
    searchQuery : "",
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
    price: 2,
    radius: 1000
  };

  constructor(private db: DatabaseService,
              private router: Router,
              private fb: FacebookService,
              private authService: AuthService) {}

  ngOnInit() {
    this.db.getList('categories')
      .subscribe((categories) => {
        this.options.category = categories;
      });
    const self = this;
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      self.center.latitude = this.lat;
      self.center.longtitude = this.lng;
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
            });
            this.events = this.events.concat(fbEvents.data);
            console.log(this.events);
            this.center = {
              latitude: this.lat,
              longtitude: this.lng
            };
            this.filterEvents();
          });
      });
  }

  onChange(changes: SimpleChanges) {
   console.log(changes);
    const opts = this.options;
    console.log(opts);
    console.log(this.filteredEvents.length);

    const unchecked = this.options.category
        .filter(cat => cat.hasOwnProperty('unchecked'))
        .map(cat => cat['$value']);

    this.filteredEvents = this.events.filter(event => {
      const search = this.options.searchQuery !== '' ? event.name.indexOf(this.options.searchQuery) !== -1 : true;
      const desision =
          event.name && search && event.name.indexOf(this.options.searchQuery) !== -1 &&
          event.price > this.options.price && unchecked.indexOf(event.category === -1);
      return desision;
    });
    console.log(this.filteredEvents.length);
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

  getDistance (lon1, lon2, lat1, lat2) {
    const rad = x => x * Math.PI / 180;
    const R = 6378137;
    const dLat = rad(lat2 - lat1);
    const dLong = rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return  R * c;
  }

  goToEvent (event) {
    this.router.navigate(['/app', 'event', event.$key]);
  }

}
