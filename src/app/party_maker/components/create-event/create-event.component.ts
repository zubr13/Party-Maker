import { Component } from '@angular/core';
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
  public isLoading = false;

  constructor(
      private auth: AngularFireAuth,
      private db: DatabaseService,
      private storage: StorageService,
      private router: Router
  ) {
    db.getList('categories').first().subscribe(list => {
      this.categories = list.map(item => item.$value);
    });
  }

  categoryChange(val) {
    this.event.category = val;
  }


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
  }

  onSave () {
    this.isLoading = true;
    this.event.userId = this.auth.auth.currentUser.uid;
    this.db.pushDataToList('events', this.event).then(snapshot => {
      if (this.file) {
        const key = snapshot.key;
        const loaded = [false, false];
        const savePath = (n, path) =>
          this.storage.getImage(path).first().subscribe(url => {
            this.db.saveData(`events/${snapshot.key}/${n === 0 ? 'image' : 'icon'}`, url)
          });

        const callback = (n, path) => {
          loaded[n] = true;
          savePath(n, path);
          if (loaded[0] && loaded[1]) {
            this.isLoading = false;
            this.router.navigate(['app', 'event', key])
          }
        };
        console.log(key, this.file, this.smallFile);
        this.storage.uploadFile(`events/${key}/image`, this.file).subscribe(null, null,
          () => callback(0, `events/${key}/image`)
        );
        this.storage.uploadFile(`events/${key}/icon`, this.smallFile).subscribe(null, null,
          () => callback(1, `events/${key}/icon`)
        );
      }
    });
    this.event = {};
  }

  loadImg(event): void {
    event.target.style.opacity = 1;
  }
}
