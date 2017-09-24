import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {SideNavbarComponent} from "./widgets/side-navbar/side-navbar.component";
import {MainContainerComponent} from "./widgets/main-container/main-container.component";
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {APP_ROUTES} from "./route.module";
import {CreateAccountPageComponent} from "./auth/create-account-page/create-account-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule, NgbProgressbarModule, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {SidebarModule} from "ng-sidebar";
import {MenuItems} from "./layout/main-layout/menu-items";
import {UserProfileComponent} from "./auth/user-profile/user-profile.component";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./backend/users/user.service";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SideNavbarComponent,
    MainContainerComponent,
    LoginPageComponent,
    CreateAccountPageComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES, { enableTracing: true }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    NgbProgressbarModule,
    NgbTabsetModule,
    HttpClientModule,
  ],
  providers: [
    MenuItems,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
