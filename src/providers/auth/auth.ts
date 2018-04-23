import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { switchMap, first } from 'rxjs/operators';

import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {

  user: Observable<any>; // IMPORTANT Global user observable for the project.

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private facebook: Facebook,
    private platform: Platform) {
    
      // Get Observable of the firebase user, if they are logged in, 
      // switch to another user of the users firestore document, otherwiser return null.
      //this.platform.ready().then((readySource) => {
        this.user = this.afAuth.authState.pipe(
          switchMap(user => {
            console.log(user);
            if (user) {
              return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
            } else {
              return Observable.of(null);
            }
          })
        )
      //})
      
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'httsp://goo.gl/Fz9nr0'
    }

    return userRef.set(data, { merge: true }); // Merge doesn't override existing data.
  }

  //// Anonymous Login ////

  async anonymousLogin(): Promise<void> {
    
    const user = await this.afAuth.auth.signInAnonymously(); // returns promise so we can await.

    await this.updateUserData(user); // then update data once signed in.

  }

  async facebookLogin() {
    if (this.platform.is('cordova')) {
      return await this.nativeFacebookLogin();
    } else {
      return await this.webFacebookLogin();
    }
  }

  async nativeFacebookLogin(): Promise<void> {
    try {

      const response = await this.facebook.login(['email', 'public_profile']);
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
    
      const firebaseUser = await firebase.auth().signInWithCredential(facebookCredential);

      return await this.updateUserData(firebaseUser);

    } catch(err) {
      console.log(err);
    }
  }

  async webFacebookLogin(): Promise<void> {
    try {
      
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

      return await this.updateUserData(credential.user);

    } catch(err) {
      console.log(err);
    }
  }

  /* //// Helpers //// */

  // Current user as a promise. Useful for one-off operations.
  async getCurrentUser(): Promise<any> {
    return this.user.pipe(first()).toPromise()
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user
  }

  async logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

}
