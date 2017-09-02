import {NgModule} from "@angular/core";
import {
  MdButtonModule,
  MdCheckboxModule,
  MdIconModule,
  MdIconRegistry,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
  MdSidenavModule,
  MdTabsModule,
  MdToolbarModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
/**
 * Created by malaka on 8/26/17.
 */


@NgModule({
  imports: [
    MdProgressBarModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdTabsModule,
    MdListModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    FlexLayoutModule,
  ],
  exports: [
    MdProgressBarModule,
    MdToolbarModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdTabsModule,
    MdListModule,
    MdIconModule,
    MdInputModule,
    FlexLayoutModule,
  ],
  providers: [MdIconRegistry]
})
export class AngularMaterialModule { }
