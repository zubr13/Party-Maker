import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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
    distance: 0
  };

  constructor() {

  }

  ngOnInit() {
  }

}
