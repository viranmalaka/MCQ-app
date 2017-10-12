/**
 * Created by malaka on 10/10/17.
 */

import {Component, OnInit} from "@angular/core";
import {APIService, Services} from "./backend/api.service";
@Component({
  selector: 'app-test',
  template: `
    <div style="height: 100%; width: 100%; background-color: white">
      the x is : <br>
      {{x | json}}
    </div>
  `,
})
export class TestComponent implements OnInit{

  public x;

  constructor(private api: APIService) {

  }

  ngOnInit(): void {
    this.api.sendGet(Services.SCHOOL, '?_distinct=district', ['result'], {}, 4, true).then(data => {
      this.x = data;
    });
    this.api.callCustom(Services.SCHOOL, 'getSchools').then(data => {
      this.x = data;
    });
    console.log(this.x);
  }
}
