/**
 * Created by malaka on 10/10/17.
 */
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserState} from "./users/user-state";
import {Observable} from "rxjs/Observable";
import construct = Reflect.construct;


@Injectable()
export class APIBackEnd {
  private domain = environment.apiDomain;
  private POST_SUCCESS = 2;
  private PUT_SUCCESS = 3;
  private GET_SUCCESS = 4;
  private DELETE_SUCCESS = 5;

  constructor(private http: HttpClient) {

  }

  public sendGet(path: string, options?: any, auth = true, success = this.GET_SUCCESS): Promise<any> {
    return this.handle(this.http.get(this.domain + path, this.genReqOptions(options, auth)), success)
  }

  public sendPost(path: string, body: any, options?: any, auth = true, success = this.POST_SUCCESS): Promise<any> {
    return this.handle(this.http.post(this.domain + path, body, this.genReqOptions(options, auth)), success);
  }

  public sendPut(path: string, body: any, options?: any, auth = true, success = this.PUT_SUCCESS): Promise<any> {
    return this.handle(this.http.put(this.domain + path, body, this.genReqOptions(options, auth)), success);
  }

  public sendDelete(path: string, options?: any, auth = true, success = this.DELETE_SUCCESS) : Promise<any> {
    return this.handle(this.http.delete(this.domain + path, this.genReqOptions(options, auth)), success)
  }

  private genReqOptions(options: {header?: any, params?: any}, auth: boolean): {headers?: HttpHeaders, params?: HttpParams} {
    options = options || {};
    let headers = new HttpHeaders();
    let params = new HttpParams();
    Object.keys(options['headers'] || {}).forEach(val => {
      headers = headers.append(val, options[val]);
    });
    Object.keys(options['params'] || {}).forEach(val => {
      params = params.append(val, params[val]);
    });
    if (auth) {
      headers = headers.append('token', UserState.getInstance().token);
    }
    return {headers :headers, params: params};
  }

  private handle(obj: Observable<any>, success: number): Promise<any> {
    return new Promise((resolve, reject) => {
      obj.subscribe(data => {
        if (data['status'] == success) {
          resolve(data);
        } else {
          reject(data);
        }
      }, error => {
        reject(error);
      });
    });
  }
}
