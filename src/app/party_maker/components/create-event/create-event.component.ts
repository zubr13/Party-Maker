import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from './../../../shared/serivces/database.service';

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

  constructor(private auth: AngularFireAuth, private db: DatabaseService) { }


  minifiedImage(obj : Object): void {
    this.img = obj['base64'];
    this.file = obj['blob'];
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
    this.event.userId = this.auth.auth.currentUser.uid;
    this.db.pushDataToList('events', this.event);
  }

  loadImg(event): void {
    event.target.style.opacity = 1;
  }
}
