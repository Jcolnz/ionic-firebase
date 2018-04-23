import { Component } from '@angular/core';

import { TabsPage } from './../../pages/tabs/tabs';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';


/**
 * Generated class for the FacebookLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'facebook-login',
  templateUrl: 'facebook-login.html'
})
export class FacebookLoginComponent {

  constructor(
    public auth: AuthProvider,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {}


  async login() {
    
    await this.auth.facebookLogin();

    await this.navCtrl.setRoot(TabsPage);
  }


}
