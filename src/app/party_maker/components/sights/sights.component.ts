import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.scss']
})
export class SightsComponent implements OnInit {
  lat: any;
  lng: any;
  private events: Array<Object>;
  constructor(
      private http: Http,
      private router: Router
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
        this.lat  = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.http.get('http://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Ccategories&generator=geosearch&colimit=50&piprop=thumbnail&pithumbsize=144&pilimit=50&wbptterms=description&clcategories=&ggscoord=50.44728800%7C30.42298000&ggsradius=10000&ggslimit=50&origin=*')
            .map(data => data.json().query.pages)
            .map(pages => Object.keys(pages).map(k => pages[k]))
            .map(sights => sights.map(sight => {
                const {lat, lon} = sight.coordinates[0];
                return Object.assign(sight, { latitude: lat, longtitude: lon })
            }))
            .subscribe(data => {
                this.events = data;
                console.log(this.events);
            });
    });
  }

    goToEvent (event) {
        this.router.navigate(['/app', 'event', event.index]);
    }


}
