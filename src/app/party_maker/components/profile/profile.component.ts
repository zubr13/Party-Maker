import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../../shared/serivces/auth.service';
import { Component, OnInit } from '@angular/core';
import {FacebookService} from 'ng2-facebook-sdk';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser;
  public theme: boolean = localStorage.getItem('theme') === 'true';

  constructor(
    private authService: AuthService,
    private fbAuth: AngularFireAuth, 
    private fb: FacebookService) {
    console.log(this.theme);
  }

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

  changeColorScheme(value) {
    const [one, two] = [document.getElementById('1'), document.getElementById('2')];
    const swapElements = (elm1, elm2) => {
      const
          parent1 = elm1.parentNode,
          next1   = elm1.nextSibling,
          parent2 = elm2.parentNode,
          next2   = elm2.nextSibling;

      parent1.insertBefore(elm2, next1);
      parent2.insertBefore(elm1, next2);
    };

    value.checked ? swapElements(one, two) : swapElements(two, one);
    localStorage.setItem('theme', value.checked);
  }

}
