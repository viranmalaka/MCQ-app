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
import {CookieModule} from "ngx-cookie";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {ToastService} from "./backend/toastr.service";
import {TextMaskModule} from "angular2-text-mask";
import {SchoolService} from "./backend/school/shool.service";
import {TestComponent} from "./Test.component";
import {APIService} from "./backend/api.service";
import {APIBackEnd} from "./backend/api.backend.service";


// Options for toast
export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SideNavbarComponent,
    MainContainerComponent,
    LoginPageComponent,
    CreateAccountPageComponent,
    UserProfileComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES, { enableTracing: true }),
    FormsModule,
    CookieModule.forRoot(),
    ReactiveFormsModule,
    TextMaskModule,
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    NgbProgressbarModule,
    NgbTabsetModule,
    HttpClientModule,
    ToastModule.forRoot(),
  ],
  providers: [
    MenuItems,
    UserService,
    SchoolService,
    APIService,
    APIBackEnd,
    { provide: ToastOptions, useClass: CustomOption },
    ToastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
