import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../../shared/serivces/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser;

  constructor(private authService: AuthService, private fbAuth: AngularFireAuth) { }

  ngOnInit() {
    this.currentUser = this.fbAuth.auth.currentUser;
    console.log(this.currentUser);
  }

}
