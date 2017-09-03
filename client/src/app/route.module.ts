/**
 * Created by malaka on 8/26/17.
 */

import {Routes} from "@angular/router";
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {CreateAccountPageComponent} from "./auth/create-account-page/create-account-page.component";
import {SocialTestComponent} from "./widgets/social-test/social-test.component";

export const APP_ROUTES : Routes = [
  { path:'login', component: LoginPageComponent },
  { path:'signup', component: CreateAccountPageComponent },
  {
    path:'dash',
    component: MainLayoutComponent,
    children :[
      {
        path: 'social',
        component: SocialTestComponent,
        data : {
          heading: 'Social'
        }
      }
    ]
  }
];


