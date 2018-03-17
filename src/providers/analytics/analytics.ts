import { Injectable } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class AnalyticsProvider {
  constructor(
    private app: App,
    private platform: Platform,
    private firebaseNative: Firebase,
    private auth: AuthProvider
  ) {

    if (platform.is('cordova')) {
      // Tracks the current page name
      app.viewDidEnter.subscribe(view => {
        firebaseNative.setScreenName(view.name);
        firebaseNative.logEvent('page_view', { page: view.name });
      });
      auth.user.subscribe(user => {
        const uid = user ? user.uid : 'guest';
        firebaseNative.setUserId(uid);
      });

      
    }
  }

  logEvent(event: string, data?: Object) {
    if (this.platform.is('cordova')) {
      console.log('analytics log...', event);
      return this.firebaseNative.logEvent(event, data);
    }
  }

  //// REMOTE CONFIG ////


}