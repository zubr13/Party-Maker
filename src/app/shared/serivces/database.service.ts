import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Query } from "angularfire2/interfaces";
import {Observable, Subject} from "rxjs";

@Injectable()
export class DatabaseService {
  public onDataPulled: Subject<{path: string, data: any}> = new Subject();
  public onDataPushed: Subject<{path: string, data: any}> = new Subject();
  public onDataRemoved: Subject<{path: string}> = new Subject();

  constructor(private DB: AngularFireDatabase) { }

  getValue(path: string): Observable<any> {
    return this.DB.object(path)
        .flatMap((data: any[]) => {
          this.onDataPulled.next({ path, data });
          return Observable.of(data);
        });
  }

  getList(path: string, query: Query = {}) : Observable<any[]> {
    return this.DB
        .list(path, {query : query})
        .flatMap((data: any[]) => {
          this.onDataPulled.next({ path, data });
          return Observable.of(data);
        });
  }

  pushDataToList(path: string, data: Object) {
    console.group('Update to database'.toUpperCase());
    console.info('path=', path);
    console.log('data=', data);
    console.groupEnd();
    this.onDataPushed.next({ path, data });
    return this.DB.list(path).push(data);
  }

  removeData(path: string) : firebase.Promise<void> {
    this.onDataRemoved.next({ path });
    return this.DB.object(path).remove();
  }

  saveData(path: string, data: Object) : Observable<any> {
    console.group('Update to database'.toUpperCase());
    console.info('path=', path);
    console.log('data=', data);
    console.groupEnd();
    this.onDataPushed.next({ path, data });
    return Observable.fromPromise(this.DB.object(path).set(data) as Promise<any>);
  }
}