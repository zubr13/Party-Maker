import { FacebookAppService } from './shared/serivces/facebook.service';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './party_maker/components/profile/profile.component';
import { ParticipatedComponent } from './party_maker/components/participated/participated.component';
import { OrganizedComponent } from './party_maker/components/organized/organized.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdGridListModule, MdIconModule, MdIconRegistry,
  MdInputModule, MdListModule,
  MdSelectModule, MdSlideToggleModule,
  MdSidenavModule, MdSliderModule, MdTabsModule, MdToolbarModule
} from "@angular/material";
import { AngularFireModule } from "angularfire2";
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './party_maker/components/login/login.component';
import { MainComponent } from './party_maker/components/main/main.component';
import { EventsMapComponent } from './party_maker/components/events-map/events-map.component';
import { EventComponent } from './party_maker/components/event/event.component';
import { PlaceOnMapComponent } from './party_maker/components/place-on-map/place-on-map.component';
import { CreateEventComponent } from './party_maker/components/create-event/create-event.component';
import { SearchComponent } from "./party_maker/components/search/search.component";
import { LogoComponent } from './party_maker/components/logo/logo.component';
import { EventParticipantsComponent } from './party_maker/components/event-participants/event-participants.component';
import { EventsInfoComponent } from './party_maker/components/events-info/events-info.component';
import { EventsListComponent } from './party_maker/components/events-list/events-list.component';

import { FacebookModule, FacebookService } from 'ng2-facebook-sdk';
import { SightsComponent } from './party_maker/components/sights/sights.component';

const config = {
  apiKey: "AIzaSyB8ZSdRKa-a93cJL3QfUldbD_OifHMC24U",
  authDomain: "partymaker-8826f.firebaseapp.com",
  databaseURL: "https://partymaker-8826f.firebaseio.com",
  projectId: "partymaker-8826f",
  storageBucket: "partymaker-8826f.appspot.com",
  messagingSenderId: "830538018323"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ProfileComponent,
    EventsMapComponent,
    EventComponent,
    SearchComponent,
    PlaceOnMapComponent,
    ParticipatedComponent,
    OrganizedComponent,
    CreateEventComponent,
    LogoComponent,
    EventParticipantsComponent,
    EventsInfoComponent,
    EventsListComponent,
    SightsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    SharedModule,
    MdButtonModule,
    MdIconModule,
    MdCheckboxModule,
    MdSliderModule,
    MdToolbarModule,
    MdGridListModule,
    MdSelectModule,
    MdTabsModule,
    MdSlideToggleModule,
    MdSidenavModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    RouterModule,
    MdTabsModule,
    FacebookModule
  ],
  providers: [
    MdIconRegistry,
    FacebookService,
    FacebookAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
