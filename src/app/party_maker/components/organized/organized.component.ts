import { FacebookService } from 'ng2-facebook-sdk';
import { AuthService } from './../../../shared/serivces/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from './../../../shared/serivces/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organized',
  templateUrl: './organized.component.html',
  styleUrls: ['./organized.component.scss']
})
export class OrganizedComponent implements OnInit {

  public events;

  private currentUser;
  constructor(
    private dbService: DatabaseService,
    private fbAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private fb: FacebookService
    ) { }

  ngOnInit() {
    this.currentUser = this.fbAuth.auth.currentUser;
    this.dbService.getList('events', {
      orderByChild: "userId",
      equalTo: this.currentUser.uid
    }).subscribe( data => {
      console.log(data);
      this.events = data;
    });
  }

  loadImg($event) {
    $event.currentTarget.style.opacity = 1;
  }

  toEvent(event) {
    this.router.navigate(['/app', 'event', event.$key]);
  }
}
