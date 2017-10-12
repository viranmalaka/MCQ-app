/**
 * Created by malaka on 8/26/17.
 */

import {Routes} from "@angular/router";
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {CreateAccountPageComponent} from "./auth/create-account-page/create-account-page.component";
import {UserProfileComponent} from "./auth/user-profile/user-profile.component";
import {TestComponent} from "./Test.component";

export const APP_ROUTES: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: CreateAccountPageComponent},
  {path: 'test', component: TestComponent},
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: ':username',
        component: UserProfileComponent,
        data: {
          heading: 'User Profile',
        }
      }
    ]
  },
];


