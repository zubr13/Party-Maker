import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  public facebookToken;

  constructor(private Auth: AngularFireAuth) {
    this.facebookToken = localStorage.getItem('facebookToken');
    // getRedirectResult().then( data => {
    //   if(data.credentials && data.credentials.accessToken){
    //     this.facebookToken = data.credentials.accessToken;
    //     console.log(this.facebookToken);
    //   }
    // });
   }

  login(email: string, password: string) : Observable<any> {
    return Observable.fromPromise(this.Auth.auth.signInWithEmailAndPassword(email, password) as Promise<any>)
  }

  logout(): Observable<void> {
    return Observable.fromPromise(this.Auth.auth.signOut() as Promise<any>);
  }

  authStatus() : Observable<boolean> {
    return this.Auth.authState.map(auth => !!auth).first();
  }

}
