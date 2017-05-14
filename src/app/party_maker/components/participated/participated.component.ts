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

  private currentUser;

  constructor(private dbService: DatabaseService,  private fbAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.fbAuth.auth.currentUser;
    this.dbService.getList('userEvents', {
      orderByKey: true,
      equalTo: this.currentUser.uid
    }).subscribe( data => {
      let events = [];
      Object.keys(data).map( key => {
        event[key]['eventId'] = key;
        events.push(event[key]);
      });
      this.events = events;
    });
  }

  loadImg($event) {
    $event.currentTarget.style.opacity = 1;
  }

  toEvent(event) {
    this.router.navigate(['/app', 'event', event.$key]);
  }


}
