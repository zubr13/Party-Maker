import { TwitterAuth } from './../../../shared/serivces/authMethods';
import { AngularFireAuth } from 'angularfire2/auth';
import { GithubAuth } from './../../../shared/serivces/authMethods';
import { FacebookAuth } from './../../../shared/serivces/authMethods';
import { GoogleAuth } from './../../../shared/serivces/authMethods';
import { VkAuth } from './../../../shared/serivces/authMethods';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isSignedIn: boolean = false;

  public userData;

  constructor(
    private googleAuth: GoogleAuth,
    private facebookAuth: FacebookAuth,
    private githubAuth: GithubAuth,
    private twitterAuth: TwitterAuth,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.authState.subscribe(data => {
      console.log(data);
      if(data == null) {
        this.isSignedIn = false;
      } else {
        this.isSignedIn = true;
        this.userData = data;
      }
    });
  }

  googleLogin() {
    this.googleAuth.login().then(() => this.router.navigate(['/app/profile']));
  }

  facebookLogin(){
    this.facebookAuth.login().then(() => this.router.navigate(['/app/profile']));
  }

  githubLogin(){
    this.githubAuth.login().then(() => this.router.navigate(['/app/profile']));
  }

}
