import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-place-on-map',
  templateUrl: './place-on-map.component.html',
  styleUrls: ['./place-on-map.component.scss']
})
export class PlaceOnMapComponent implements OnInit {
  @Input() event: any;
  @Output() onSave = new EventEmitter<any>();
  lat = 50.45466;
  lng = 30.5238;

  constructor() { }

  ngOnInit() {
  }
  
  onClick (event) {
    this.event.longtitude = event.coords.lng;
    this.event.latitude = event.coords.lat;
  }

  save () {
    this.onSave.emit(this.event);
  }

}
