import { ProfileComponent } from './party_maker/components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/guards/auth.guard";
import { LoginComponent } from "./party_maker/components/login/login.component";
import { MainComponent } from "./party_maker/components/main/main.component";
import { EventsMapComponent } from './party_maker/components/events-map/events-map.component';
import { EventComponent } from "./party_maker/components/event/event.component";
import { CreateEventComponent } from './party_maker/components/create-event/create-event.component';
import {SearchComponent} from "./party_maker/components/search/search.component";
import {EventsListComponent} from "./party_maker/components/events-list/events-list.component";
import {ParticipatedComponent} from "./party_maker/components/participated/participated.component";
import {OrganizedComponent} from "./party_maker/components/organized/organized.component";
import {SightsComponent} from './party_maker/components/sights/sights.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          name: 'My Profile'
        }
      },
      {
        path: 'events-map',
        component: EventsMapComponent,
        data: {
          name: 'Events Map'
        }
      },
      {
        path: 'events-list',
        component: EventsListComponent,
        data: {
          name: 'Events List'
        }
      },
      {
        path: 'event/:id',
        component: EventComponent
      },
      {
        path: 'participated',
        component: ParticipatedComponent
      },
      {
        path: 'organized',
        component: OrganizedComponent
      },
      {
        path: 'create',
        component: CreateEventComponent,
        data: {
          name: 'Create Event'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          name: 'Search for event'
        }
      }, {
        path: 'sights',
        component: SightsComponent,
        data: {
          name: 'Sights'
        }
      },
    ],
  },
  {
    path: '**',
      redirectTo: 'app/events-map'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
