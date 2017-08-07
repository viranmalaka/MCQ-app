import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {NavbarComponent} from "./common/navbar/navbar.component";
import {MdButtonModule, MdSidenav, MdSidenavContainer, MdSidenavModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    MdSidenavModule,
    MdButtonModule
    // MdSidenavContainer,
    // MdSidenav
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
