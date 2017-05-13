import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../../../shared/serivces/database.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.scss']
})
export class EventParticipantsComponent implements OnInit {

  @Input() eventId: string;

  public users;

  constructor(private dbService: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if(params['id']) {
        this.eventId = params['id'];
      }
      this.dbService.getList(`eventsParticipants/${this.eventId}`).subscribe( users => {
        this.users = users;
      });
    });
  }

}
