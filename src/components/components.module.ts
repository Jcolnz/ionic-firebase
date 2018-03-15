import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { FacebookLoginComponent } from './facebook-login/facebook-login';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login';
import { UserLogoutComponent } from './user-logout/user-logout';
import { PostFeedComponent } from './post-feed/post-feed';
import { HeartButtonComponent } from './heart-button/heart-button';
import { UserRelationshipComponent } from './user-relationship/user-relationship';


@NgModule({
	declarations: [
        FacebookLoginComponent,
        FacebookLoginComponent,
        AnonymousLoginComponent,
        UserLogoutComponent,
        PostFeedComponent,
    HeartButtonComponent,
    UserRelationshipComponent
    ],
	imports: [
		CommonModule,
		IonicModule
	],
    exports: [
        FacebookLoginComponent,
        FacebookLoginComponent,
        AnonymousLoginComponent,
        UserLogoutComponent,
        PostFeedComponent,
    HeartButtonComponent,
    UserRelationshipComponent,
    ]
})
export class ComponentsModule {}
