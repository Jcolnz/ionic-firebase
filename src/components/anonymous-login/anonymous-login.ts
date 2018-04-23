import { Component } from '@angular/core';

import { TabsPage } from './../../pages/tabs/tabs';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';



@Component({
  selector: 'anonymous-login',
  templateUrl: 'anonymous-login.html'
})
export class AnonymousLoginComponent {

  constructor(
    public auth: AuthProvider,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {}


  async login() {
    const loader = this.loadingCtrl.create({
      content: "Logging in anonymously..."
    });

    loader.present()

    await this.auth.anonymousLogin();

    loader.dismiss()
    await this.navCtrl.setRoot(TabsPage);
  }

}
