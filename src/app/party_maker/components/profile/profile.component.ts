import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../../shared/serivces/auth.service';
import { Component, OnInit } from '@angular/core';
import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser;

  constructor(private authService: AuthService, private fbAuth: AngularFireAuth, private fb: FacebookService) { }

  ngOnInit() {
    this.currentUser = this.fbAuth.auth.currentUser;
    console.log(this.currentUser);
    this.fb.init({
      appId: '1955507991402224',
      version: 'v2.9'
    });
    this.getFriends();
  }

  getFriends() {
    this.fb.api('/me/friends?accessToken=EAACEdEose0cBAKvFcd6jZBFrD9HoCwduvh7SymLzMmWcs0RHSW7ZBUgj5JPiz2kHwaZBr5ksZAGJn6UskQZADpo9YlZABZBoKSdJRq15HWYryRSJs8SFVx6UHh3Gu1f2gJHA5DskUmuffZCBEgOgIaZCfbd8ZBRd6soAuGqxzmmjZAPA44TUlUsqh6lOp1qZAZCAGtQMZD')
      .then((res: any) => {
        console.log('Got the users friends', res);
      })
      .catch((error) => console.log(error));
  }

}
