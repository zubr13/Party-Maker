import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyEventsModule } from './party_maker/components/my-events/my-events.module';
import { ProfileComponent } from './party_maker/components/profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdIconRegistry, MaterialModule } from "@angular/material";
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
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    SharedModule,
    MyEventsModule,
    RouterModule
  ],
  providers: [
    MdIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
