import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../../shared/serivces/database.service'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  events = [];
  lat = 50.45466;
  lng = 30.5238;

  searchQuery = "Kitten's show";
  options = {
    time: null,
    duration: 0,
    category: [
      {
        name: 'Concert',
        value: true
      },
      {
        name: 'Theatre',
        value: true
      },
      {
        name: 'Meeting',
        value: true
      },
    ],
    price: {
        isFree: false,
        value: 2
    },
    radius: 0
  };

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getList('events')
      .subscribe((events) => {
        this.events = events;
      });
  }

}
