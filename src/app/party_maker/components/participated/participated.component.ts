import { AuthService } from './../../../shared/serivces/auth.service';
import { FacebookService } from 'ng2-facebook-sdk';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from './../../../shared/serivces/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participated',
  templateUrl: './participated.component.html',
  styleUrls: ['./participated.component.scss']
})
export class ParticipatedComponent implements OnInit{

  public events;

  public facebookEvents = [];

  private currentUser;

  constructor(
    private dbService: DatabaseService,  
    private fbAuth: AngularFireAuth, 
    private router: Router,
    private fb: FacebookService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getFacebookEvents();
    this.currentUser = this.fbAuth.auth.currentUser;
    this.dbService.getList('userEvents', {
      orderByKey: true,
      equalTo: this.currentUser.uid
    }).subscribe( data => {
      let events = [];
      Object.keys(data).map( key => {
        data[key]['eventId'] = key;
        events.push(data[key]);
      });
      this.events = [];
      this.events.concat(events);
    });
  }

  loadImg($event) {
    $event.currentTarget.style.opacity = 1;
  }

  toEvent(event) {
    this.router.navigate(['/app', 'event', event.$key]);
  }

  toFacebookEvent(event) {
    this.router.navigate(['/app', 'event', event.id]);
  }

  getFacebookEvents(){
    if(this.fbAuth.auth.currentUser.providerData[0].providerId === "facebook.com"){
      console.log(this.authService.facebookToken);
      this.fb.api(`me/events?access_token=${this.authService.facebookToken}`).then(data => {
        console.log(data);
        data['data'].map( event => {
          if(event['rsvp_status'] === "attending") {
            this.facebookEvents.push(event);
          }
        });
      })
    }
  }


}
