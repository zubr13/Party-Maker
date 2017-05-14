import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Router} from "@angular/router";
import {PassDataService} from "../../../shared/serivces/pass-data.service";

@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.scss']
})
export class SightsComponent implements OnInit {
  lat: any;
  lng: any;
  styles = [];
  private events: Array<Object>;
  constructor(
      private http: Http,
      private router: Router,
      private passD: PassDataService
  ) { }

  ngOnInit() {
      if (localStorage.getItem('theme') === 'true') {
       this.styles = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]; 
    } else {
      this.styles = [];
    }
    navigator.geolocation.getCurrentPosition(position => {
        this.lat  = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.http.get('http://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Ccategories&generator=geosearch&colimit=50&piprop=thumbnail&pithumbsize=144&pilimit=50&wbptterms=description&clcategories=&ggscoord=50.44728800%7C30.42298000&ggsradius=10000&ggslimit=50&origin=*')
            .map(data => data.json().query.pages)
            .map(pages => Object.keys(pages).map(k => pages[k]))
            .map(sights => sights.map(sight => {
                const {lat, lon} = sight.coordinates[0];
                // img: sight.thumbnail.source
                return Object.assign(sight, {
                    index: sight.index,
                    title: sight.title,
                    latitude: lat,
                    longtitude: lon,
                    image: sight.thumbnail ? sight.thumbnail.source : '',
                    description: sight.terms ? sight.terms.description : ''
                })
            }))
            .subscribe(data => this.events = data);
    });
  }

    goToEvent (event) {
      console.log(event);
        this.passD.subject.next(event);
        this.router.navigate(['/app', 'event', event.index], { queryParams: { type: 'wiki' }});
    }


}
