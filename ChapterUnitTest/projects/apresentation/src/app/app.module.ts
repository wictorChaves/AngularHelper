import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';

import { AngularFireModule }        from '@angular/fire';
import { AngularFirestoreModule }   from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule }    from '@angular/fire/auth';

import { ChatComponent }            from './pages/chat/chat.component';
import { LoginComponent }           from './pages/login/login.component';

import { ReactiveFormsModule }                      from '@angular/forms';

const config = {
  apiKey           : "AIzaSyDEggwcfASRCOd_sn1cgLFNUoMbslU72Q0",
  authDomain       : "chapter-c5c35.firebaseapp.com",
  projectId        : "chapter-c5c35",
  storageBucket    : "chapter-c5c35.appspot.com",
  messagingSenderId: "494760157810",
  appId            : "1:494760157810:web:821286112d7115176b98eb"
};

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,

    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }