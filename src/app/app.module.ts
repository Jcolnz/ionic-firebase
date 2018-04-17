import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

/// ADD your firebase web credentials in the object below

const firebaseConfig = { 
  apiKey: "AIzaSyBTfd6OZuYcOx2gDHwbaNF3klCYWmKxWYg",
    authDomain: "fir-demo-3e972.firebaseapp.com",
    databaseURL: "https://fir-demo-3e972.firebaseio.com",
    projectId: "fir-demo-3e972",
    storageBucket: "",
    messagingSenderId: "61689650262"
}

// import after adding credientials for allowing ionic to use firebase.
import { Firebase } from '@ionic-native/firebase';

import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { AdMobFree } from '@ionic-native/admob-free';

import { ComponentsModule } from '../components/components.module'
import { DatabaseProvider } from '../providers/database/database';
import { FcmProvider } from '../providers/fcm/fcm';
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { RemoteConfigProvider } from '../providers/remote-config/remote-config';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Firebase,
    Facebook,
    DatabaseProvider,
    Camera,
    AdMobFree,
    FcmProvider,
    AnalyticsProvider,
    RemoteConfigProvider,
    AuthProvider
  ]
})
export class AppModule {}
