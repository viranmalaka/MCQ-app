/**
 * Created by malaka on 8/26/17.
 */

import {NgModule} from "@angular/core";
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "angular2-perfect-scrollbar";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
  ]
})
export class PluginsModule {
}
