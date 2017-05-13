import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../../shared/serivces/storage.service'; 

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {
  lat = 50.45466;
  lng = 30.5238;
  events: any;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.events = [{
      $key: '1.jpg',
      latitude: 50.45466,
      longtitude: 30.5238
    }];
    for (let event of this.events) {
       this.storageService.getImage(`events/${event.$key}`)
        .subscribe((data) => {
          event.imageUrl = data;
        });
    }
  }

}
