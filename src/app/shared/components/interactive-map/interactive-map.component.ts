import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../../shared/serivces/database.service'; 
import {Router} from "@angular/router";
import {FacebookService} from 'ng2-facebook-sdk';
import {AuthService} from './../../../shared/serivces/auth.service';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {
  lat: any;
  lng: any;
  events: any;

  constructor(private db: DatabaseService, private router: Router, private fb: FacebookService,
              private authService: AuthService) { }

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
            console.log(this.events);
          });
      });
  }

  goToEvent (event) {
    this.router.navigate(['/app', 'event', event.$key]);
  }

}
