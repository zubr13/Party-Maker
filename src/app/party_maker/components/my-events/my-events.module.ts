import {MdListModule, MdTabsModule} from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { DatabaseService } from './../../../shared/serivces/database.service';
import { RouterModule } from '@angular/router';
import { MyEventsComponent } from './my-events.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipatedComponent } from './participated/participated.component';
import { OrganizedComponent } from './organized/organized.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule,
    MdTabsModule,
    MdListModule,
  ],
  declarations: [
    MyEventsComponent,
    ParticipatedComponent,
    OrganizedComponent
  ],
  exports: [
    MyEventsComponent,
    ParticipatedComponent,
    OrganizedComponent
  ],
  providers: [
    DatabaseService,
    AngularFireDatabase
  ]
})
export class MyEventsModule { }
