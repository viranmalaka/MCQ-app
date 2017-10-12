/**
 * Created by malaka on 9/2/17.
 */

import {Injectable} from "@angular/core";
import {UserState} from "./user-state";
import {CookieService} from "ngx-cookie";
import {APIBackEnd} from "../api.backend.service";
import {APICaller} from "../api.caller";


@Injectable()
export class UserService extends APICaller{

  public readyToStartApp: Promise<any>;

  private userDomain: string = "user/";

  constructor(private server: APIBackEnd, private cookieService: CookieService) {
    super(server);
  }

  public readAuthCookie(): boolean {
    let localCookieToken = this.cookieService.get('auth-token');
    if (localCookieToken) {
      UserState.getInstance().token = localCookieToken;
      return true;
    }
    return false;
  }

  public writeAuthCookie(token: string): boolean {
    this.cookieService.put('auth-token', token);
    console.log('write cookie');
    return true;
  }

  public getTokenUser(): Promise<any> {
    return this.server.sendGet(this.userDomain + 'token_user', {}, true, 1);
  }

  public postLogin(username: string, password: string): Promise<any> {
    const body = {
      username: username,
      password: password,
    };
    return this.server.sendPost(this.userDomain + 'login', body, {}, false, 1);
  }

  public getCountByUserName(username: string): Promise<any> {
    return this.server.sendGet(this.userDomain + "count?username=" + username);
  }

  public getCountByEmail(email: string): Promise<any> {
    return this.server.sendGet(this.userDomain + "count?email=" + email);
  }

  public postSignUp(username: string, password: string, email: string, type: string): Promise<any> {
    const body = {
      username: username,
      password: password,
      email: email,
      accType: type
    };
    return this.server.sendPost(this.userDomain + 'signup', body,{}, false, 1);
  }

  public getUser(path: string, params: any, success: number, auth = true): Promise<any> {
    return this.server.sendGet(path, {params: params}, auth, success);
  }

  public putUserDetails(data: any): Promise<any> {
    return this.server.sendPut(this.userDomain + UserState.getInstance().user['_id'], data);
  }

  public putOneUserDetails(data: any): Promise<any> {
    return this.server.sendPut(this.userDomain + UserState.getInstance().user['_id'] + '/edit', data)
  }

  public putOneStudentDetails(data: any): Promise<any> {
    return this.server.sendPut(this.userDomain + 'sub/student/' + UserState.getInstance().user['accId'] + '/edit', data);
  }
}
