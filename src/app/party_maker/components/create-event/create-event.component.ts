import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from './../../../shared/serivces/database.service';
import {StorageService} from "../../../shared/serivces/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  event:any = {};
  categories = [];
  placeOnMapMode = false;
  public img: any;
  public file: File | null;
  public smallFile: any;

  constructor(
      private auth: AngularFireAuth,
      private db: DatabaseService,
      private storage: StorageService,
      private router: Router
  ) { }


  minifiedImage(obj : Object): void {
    console.log(obj);
    if (obj['width'] === 250) {
      this.img = obj['base64'];
      this.file = obj['blob'];
    } else {
      this.smallFile = obj['blob'];
    }
  }

  getFile($event): void {
    const fList = $event['srcElement']['files'];
    this.file = fList.length > 0 ? fList[0] : null;
    console.log(this.file);
  }

  onPlaceOnMap () {
    this.placeOnMapMode = true;

  }

  onPlaceSave () {
    this.placeOnMapMode = false;
    console.log('event', this.event);
  }

  onSave () {
    this.event.userId = this.auth.auth.currentUser.uid;
    this.db.pushDataToList('events', this.event).then(snapshot => {
      const key = snapshot.key;
      const loaded = [false, false];
      const callback = n => {
        loaded[n] = true;
        if (loaded[0] && loaded[1]) {
          console.log('navigated');
          this.router.navigate(['app', 'event', key, 'info'])
        }
      };
      console.log(key, this.file, this.smallFile);
      this.storage.uploadFile(`events/${key}/image`, this.file).subscribe(
          () => console.log('next1'),
          null,
          () => callback(0)
      );
      this.storage.uploadFile(`events/${key}/icon`, this.smallFile).subscribe(
          () => console.log('next2'),
          null,
          () => callback(1)
      );
      console.log(key);
    });
    this.event = {};
  }

  loadImg(event): void {
    event.target.style.opacity = 1;
  }
}
