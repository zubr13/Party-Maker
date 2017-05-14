import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.scss']
})
export class SightsComponent implements OnInit {
  lat: any;
  lng: any;

  constructor(private http: Http) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
        this.lat  = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.http.get('http://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Ccategories&generator=geosearch&colimit=50&piprop=thumbnail&pithumbsize=144&pilimit=50&wbptterms=description&clcategories=&ggscoord=50.44728800%7C30.42298000&ggsradius=10000&ggslimit=50&origin=*')
        .subscribe((data) => {
          console.log(data.json());
        });
    });
  }

}
