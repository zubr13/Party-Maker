import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../../shared/serivces/database.service';
import {Router} from "@angular/router";
import {AuthService} from './../../../shared/serivces/auth.service';
import {FacebookAppService} from "../../serivces/facebook.service";
@Component({
    selector: 'app-interactive-map',
    templateUrl: './interactive-map.component.html',
    styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {
    lat = 50.45466;
    lng = 30.5238;
    events: any;
    styles = [];

constructor(private db: DatabaseService, private router: Router, //private fb: FacebookService,
            private authService: AuthService, private fb: FacebookAppService) {
}

ngOnInit() {
    if (localStorage.getItem('theme') === 'true') {
       this.styles = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]; 
    } else {
      this.styles = [];
    }
    const self = this;
    navigator.geolocation.getCurrentPosition(position => {
        self.lat  = position.coords.latitude;
        self.lng = position.coords.longitude;
    });
    this.db.getList('events')
        .subscribe(events => {
            this.events = events;
            this.fb.searchEvents({
                q:'Kyiv',
                type: 'event',
                since: '2017-05-13',
                until: '2017-05-16'
            }, 20).subscribe(
                data => this.events = this.events.concat(data.map(event => {
                    if (event.place && event.place.location) {
                        event.longtitude = event.place.location.longitude;
                        event.latitude = event.place.location.latitude;
                        event.$key = event.id;
                    }
                    return event;
                })),
                err => console.error(err),
                () => console.log('done', this.events)
            );
        });
    }

    goToEvent (event) {
        this.router.navigate(['/app', 'event', event.$key]);
    }
}