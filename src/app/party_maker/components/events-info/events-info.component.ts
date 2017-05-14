import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../../../shared/serivces/database.service';
import { Component, OnInit, Input } from '@angular/core';
import {FacebookService} from 'ng2-facebook-sdk';
import {AuthService} from './../../../shared/serivces/auth.service';
import {PassDataService} from "../../../shared/serivces/pass-data.service";

@Component({
  selector: 'app-events-info',
  templateUrl: './events-info.component.html',
  styleUrls: ['./events-info.component.scss']
})
export class EventsInfoComponent implements OnInit {
  @Input() eventId: string;

  public event;

  public isUserParticipated = false;

  public isFacebookEvent = false;

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private auth: AngularFireAuth,
              private fb: FacebookService, private authService: AuthService, private passD: PassDataService) { }

  ngOnInit() {

    this.route.queryParams.first().subscribe(data => {
      console.log(data);
      if (data && data.type === 'wiki') {
        this.passD.subject.first().subscribe(data => {
          this.event = data;
          console.log(this.event);
        });
      } else {
        this.route.params.subscribe( params => {
          console.log(params);
          if(params['id']){
            this.eventId = params['id'];
          }
          this.dbService.getValue(`events/${this.eventId}`).map( event => {
            event.eventId = this.eventId;
            this.event = event;
            if (+this.eventId) {
              this.isFacebookEvent = true;
              this.fb.init({
                appId: '1955507991402224',
                version: 'v2.9'
              });
              this.fb.api(`/${this.eventId}?access_token=${this.authService.facebookToken}`)
                  .then((fbEvent) => {
                    this.event = fbEvent;
                  })
                  .then( () => {
                    this.fb.api(`/${this.eventId}/attending?access_token=${this.authService.facebookToken}`).then( (data) => {
                      for(let i = 0; i < data['data'].length; i++){
                        if(data['data'][i]['id'] === this.auth.auth.currentUser.providerData[0].uid) {
                          this.isUserParticipated = true;
                          break;
                        }
                      }
                    });
                  })
                  .catch(error => console.log(error));
            }
            return event;
          }).subscribe( event => {
            this.dbService.getList(`userEvents/${this.auth.auth.currentUser.uid}`, {
              orderByChild: 'eventId',
              equalTo: this.eventId
            }).subscribe( data => {
              if(data.length > 0) {
                this.isUserParticipated = true;
              }
            });
          });
        });
      }
    })

  }

  participate() {
    if(this.isFacebookEvent){
      console.log(`/${this.eventId}/attending?access_token=${this.authService.facebookToken}`, 'post');
      this.fb.api(`/${this.eventId}/attending?access_token=${this.authService.facebookToken}`, "post")
      .then(data => console.log(data))
      .then( () => this.dbService.pushDataToList(`eventsParticipants/${this.eventId}`, this.auth.auth.currentUser.providerData[0]))
      .then( () => this.isUserParticipated = true);
    } else {
      this.dbService.pushDataToList(`userEvents/${this.auth.auth.currentUser.uid}`, this.event)
      .then( () => this.dbService.pushDataToList(`eventsParticipants/${this.eventId}`, this.auth.auth.currentUser.providerData[0]))
      .then( () => this.isUserParticipated = true);
    }
  }
}
