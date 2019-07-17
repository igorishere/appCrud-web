import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule}  from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DbServiceService } from './service/db-service.service';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),//initialize firebase
    AngularFirestoreModule//module for Firestore. Not the same for realtime database
  ],
  providers: [
    DbServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
