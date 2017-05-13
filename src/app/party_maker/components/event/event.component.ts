import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../../../shared/serivces/database.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() eventId: string;


  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private auth: AngularFireAuth) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if(params['id']){
        this.eventId = params['id'];
      }
    });
  }

}
