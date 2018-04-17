import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { switchMap, take } from 'rxjs/operators';

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
  }

  // Current user as a promise. Useful for one-off operations.
  getCurrentUser(): Promise<any> {
    return this.user.pipe(take(1)).toPromise() // Useful for ionic lifecycle hooks. Pipe in take(1) to emit the last value and return as a promise.
  }

  private UpdateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'httsp://goo.gl/Fz9nr0'
    }

    return userRef.set(data, { merge: true }); // Merge doesn't override existing data.
  }

  async anonymousLogin(): Promise<void> {
    const user = await this.afAuth.auth.signInAnonymously(); // returns promise so we can await.
    await this.UpdateUserData(user); // then update data once signed in.

  }

}
