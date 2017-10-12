/**
 * Created by malaka on 10/9/17.
 */

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {APIBackEnd} from "../api.backend.service";
import {APICaller} from "../api.caller";


@Injectable()
export class SchoolService extends APICaller{

  private schoolDomain = "school/";

  constructor(private http: HttpClient, private server: APIBackEnd) {
    super(server);
  }
  public getAllDistrict(): Promise<any> {
    return this.server.sendGet(this.schoolDomain + '?_distinct=district');
  }

  public getSchools(district?: string): Promise<any> {
    if (district === undefined) {
      return this.server.sendGet(this.schoolDomain);
    } else {
      return this.server.sendGet(this.schoolDomain + '?_sort=name&district=' + district);
    }
  }

  public getDistrictForSchool(id: string): Promise<any> {
    return this.server.sendGet('?_id=' + id + "&_select=-_id,-name");
  }

}
