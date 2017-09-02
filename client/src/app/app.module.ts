import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularMaterialModule} from "./app-styles/angular-material.module";
import {PluginsModule} from "./app-styles/plugins.moudles";
import {RouterModule} from "@angular/router";
import {MainLayoutComponent} from "./app-layout/main-layout/main-layout.component";
import {SideNavbarComponent} from "./app-widgets/side-navbar/side-navbar.component";
import {MainContainerComponent} from "./app-widgets/main-container/main-container.component";
import {LoginPageComponent} from "./app-widgets/login-page/login-page.component";
import {APP_ROUTES} from "./app-routes/app-route.module";
import {CreateAccountPageComponent} from "./app-widgets/create-account-page/create-account-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule, NgbProgressbarModule, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {SidebarModule} from "ng-sidebar";
import {MenuItems} from "./app-layout/main-layout/menu-items";
import {SocialTestComponent} from "./app-widgets/social-test/social-test.component";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SideNavbarComponent,
    MainContainerComponent,
    LoginPageComponent,
    CreateAccountPageComponent,
    SocialTestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PluginsModule,
    AngularMaterialModule,
    RouterModule.forRoot(APP_ROUTES, { enableTracing: true }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    NgbProgressbarModule,
    NgbTabsetModule
  ],
  providers: [
    MenuItems
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
