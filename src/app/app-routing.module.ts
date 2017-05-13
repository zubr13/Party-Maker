import { EventChatComponent } from './party_maker/components/event-chat/event-chat.component';
import { EventParticipantsComponent } from './party_maker/components/event-participants/event-participants.component';
import { EventsInfoComponent } from './party_maker/components/events-info/events-info.component';
import { OrganizedComponent } from './party_maker/components/my-events/organized/organized.component';
import { ParticipatedComponent } from './party_maker/components/my-events/participated/participated.component';
import { MyEventsComponent } from './party_maker/components/my-events/my-events.component';
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
      // {
      //   path: 'event/:id/info',
      //   component: EventComponent
      // },
      // {
      //   path: 'event/:id/participants',
      //   component: EventParticipantsComponent
      // },
      // {
      //   path: 'event/:id/chat',
      //   component: EventChatComponent
      // },
      {
        path: 'my-events',
        component: MyEventsComponent,
        children: [
          {
            path: 'participated',
            component: ParticipatedComponent
          },
          {
            path: 'organized',
            component: OrganizedComponent
          }
        ]
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
