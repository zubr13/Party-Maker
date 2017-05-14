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

    constructor(private db: DatabaseService, private router: Router, //private fb: FacebookService,
                private authService: AuthService, private fb: FacebookAppService) {
    }

    ngOnInit() {
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
                    since: 'today',
                    until: 'tomorrow'
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