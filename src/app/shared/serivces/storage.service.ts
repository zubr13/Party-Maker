import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class StorageService {
  private storage = firebase.storage();
  constructor() {}

  getImage(path: string) : Observable<any> {
    //.catch(err => Promise.resolve('') as Promise<any>);
    return Observable.fromPromise(this.storage.ref(path).getDownloadURL() as Promise<any>);
  }

  uploadFile(path: string, img: File): Subject<any> {
    const subject = new Subject();
    const task = this.storage.ref(path).put(img);
    task.on(
        'state_changed',
        snapshot => subject.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        err => subject.error(err),
        () => {
          subject.next(task.snapshot.downloadURL);
          subject.complete();
        }
    );
    return subject;
  }
}
