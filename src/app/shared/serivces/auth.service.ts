import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private Auth: AngularFireAuth) { }

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
