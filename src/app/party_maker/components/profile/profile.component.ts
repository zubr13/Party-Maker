import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../../shared/serivces/auth.service';
import { Component, OnInit } from '@angular/core';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ng2-facebook-sdk';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser;

  constructor(
    private authService: AuthService,
    private fbAuth: AngularFireAuth, 
    private fb: FacebookService) { }

  ngOnInit() {
    this.currentUser = this.fbAuth.auth.currentUser;
    this.fb.init({
      appId: '1955507991402224',
      version: 'v2.9'
    }).then( data => {
      console.log(data);
    });
    console.log(this.fbAuth.auth.currentUser, this.currentUser.providerData[0]);
    if (this.currentUser.providerData && this.currentUser.providerData[0].providerId.indexOf('facebook') !== -1) {
      console.log('facebook');
    }
    // console.log(this.fb.getAuthResponse().);
    this.getFriends();
  }

  getFriends() {
    this.fb.api(`/search?q=&type=event&limit=500&access_token=${this.authService.facebookToken}`)
      .then((res: any) => {
        console.log('Got the users friends', res);
      })
      .catch((error) => console.log(error));
  }

}
