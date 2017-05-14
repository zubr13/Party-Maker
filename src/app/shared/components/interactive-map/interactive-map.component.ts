import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../../shared/serivces/database.service'; 
import {Router} from "@angular/router";
import {FacebookService} from 'ng2-facebook-sdk';
import {AuthService} from './../../../shared/serivces/auth.service';
import {ReplaySubject} from 'rxjs';
@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {
  lat = 50.45466;
  lng = 30.5238;
  events: any;

  constructor(private db: DatabaseService, private router: Router, private fb: FacebookService,
              private authService: AuthService) { 
              }

  ngOnInit() {
    const self = this;
      navigator.geolocation.getCurrentPosition(position => {
        self.lat  = position.coords.latitude;
        self.lng = position.coords.longitude;
      });
    this.db.getList('events')
      .subscribe((events) => {
        this.events = events;
        this.fb.init({
          appId: '1955507991402224',
          version: 'v2.9'
        });
        this.fb.api(`/search?q=Kyiv&type=event&since=today&access_token=${this.authService.facebookToken}`)
          .then((fbEvents) => {
            console.log(fbEvents);
            const subject = new ReplaySubject();
            let counter = 0;
            const request = (d = fbEvents.paging.next) => this.fb.api(d).then(data => {
              console.log(data)
                if (!data.paging || !data.paging.next || counter > 20) {
                  subject.subscribe(allData => console.warn(allData))
                  subject.complete(); 
                } else {
                  subject.next(data.data);
                  ++counter;
                  request(data.paging.next);
                }
            })
            request();

            // Observable.fromPromise()
            //   .then((sop) => {
            //     console.log('F2');
            //     console.log(sop);
            //   })
            
            
            
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
