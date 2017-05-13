import { ActivatedRouteSnapshot } from '@angular/router';
import { VkAuth } from './serivces/authMethods/vk';
import { TwitterAuth } from './serivces/authMethods/twitter';
import { GithubAuth } from './serivces/authMethods/github';
import { FacebookAuth } from './serivces/authMethods/facebook';
import { GoogleAuth } from './serivces/authMethods/google';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageService } from "./serivces/storage.service";
import { AuthService } from "./serivces/auth.service";
import { ServiceWorkerService } from "./serivces/service-worker.service";
import { VkConfiguration } from './serivces/vk-auth-config.service';
import { AuthGuard } from "./guards/auth.guard";
import { DatabaseService } from "./serivces/database.service";

import { CanvasImageDirective } from "./directives/canvas-image.directive";
import { InteractiveMapComponent } from './components/interactive-map/interactive-map.component';
import { DialogDirective } from "./directives/dialog.directive";
import { AgmCoreModule, AgmMap, AgmMarker } from "@agm/core";
import { FormsModule } from '@angular/forms';
import {MdIconModule} from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    CanvasImageDirective,
    InteractiveMapComponent,
    DialogDirective
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1S_k3L8rHB30x74jllJZ4rGDG2V8dMGI'
    }),
    AngularFireAuthModule,
    FormsModule,
    MdIconModule
  ],
  providers: [
    StorageService,
    AuthGuard,
    AuthService,
    ServiceWorkerService,
    { provide: 'VkAuthConfig', useClass: VkConfiguration },
    GoogleAuth,
    FacebookAuth,
    GithubAuth,
    TwitterAuth,
    VkAuth,
    DatabaseService,
    AngularFireDatabase
  ],
  exports: [
    InteractiveMapComponent,
    CanvasImageDirective,
    AgmMap,
    AgmMarker
  ]
})
export class SharedModule { }
