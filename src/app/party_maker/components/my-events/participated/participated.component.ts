import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from './../../../../shared/serivces/database.service';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-participated',
  templateUrl: './participated.component.html',
  styleUrls: ['./participated.component.scss']
})
export class ParticipatedComponent implements OnInit{

  public events;

  constructor(private dbService: DatabaseService, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.dbService.getList('userEvents', {
      orderByKey: true,
      equalTo: this.auth.auth.currentUser.uid
    }).subscribe( data => {
      console.log(data);
      let events = [];
      Object.keys(data[0]).map( key => {
        data[0][key]['eventId'] = key;
        events.push(data[0][key]);
      });
      this.events = events;
    });
  }

  toEvent(event) {
    this.router.navigate(['/app', 'event', event.eventId]);
  }


}
