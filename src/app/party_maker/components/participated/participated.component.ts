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

  constructor(private dbService: DatabaseService, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.dbService.getList(`userEvents/${this.auth.auth.currentUser.uid}`)
        .first()
        .subscribe( data => this.events = data);
  }

  loadImg($event) {
    $event.currentTarget.style.opacity = 1;
  }

  toEvent(event) {
    this.router.navigate(['/app', 'event', event.eventId]);
  }


}
