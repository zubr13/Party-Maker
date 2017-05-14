import { AuthService } from './../../../shared/serivces/auth.service';
import { FacebookService } from 'ng2-facebook-sdk';
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

  public isFacebookEvent = false;

  public facebookUsers;

  constructor(
    private dbService: DatabaseService, 
    private route: ActivatedRoute, 
    private fb: FacebookService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      
      if(params['id']) {
        this.eventId = params['id'];
      }
      if(+this.eventId){
        this.fb.init({
                appId: '1955507991402224',
                version: 'v2.9'
              });
        this.isFacebookEvent = true;
        this.fb.api(`/${this.eventId}/attending?access_token=${this.authService.facebookToken}`)
          .then(data => {
            this.facebookUsers = [];
            this.facebookUsers.push(...data['data']);
            console.log(this.facebookUsers);
          });
      }
      this.dbService.getList(`eventsParticipants/${this.eventId}`).subscribe( users => {
        this.users = users;
      });
    });
  }

  redirectToFacebook(user){
    window.open(`https://www.facebook.com/${user.id}`, 'blank');
  }

}
