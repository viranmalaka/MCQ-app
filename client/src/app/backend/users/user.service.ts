/**
 * Created by malaka on 9/2/17.
 */

import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserState} from "./user-state";


@Injectable()
export class UserService {

  private userDomain: string = environment.apiDomain + "user";

  constructor(private http: HttpClient){

  }

  public postLogin(username: string, password: string): Promise<any>{
    const body = {
      username: username,
      password: password,
    };

    return new Promise((res, rej) => {
      this.http.post(this.userDomain + "/login", body).subscribe(data => {
        if(data['status'] == 1){
          res(data);
        } else {
          rej(data);
        }
      });
    });
  }

  public getCountByUserName(username: string): Promise<any>{
    return new Promise((res, rej) => {
      this.http.get(this.userDomain + "/count?username=" + username).subscribe(data => {
        if(data['status'] == 4){
          res(data['count']);
        }else{
          rej(data['mes']);
        }
      });
    })
  }

  public getCountByEmail(email: string): Promise<any>{
    return new Promise((res, rej) => {
      this.http.get(this.userDomain + "/count?email=" + email).subscribe(data => {
        if(data['status'] == 4){
          res(data['count']);
        }else{
          rej(data['mes']);
        }
      });
    })
  }

  public postSignUp(username: string, password: string, email: string, type: string): Promise<any>{
    const body = {
      username : username,
      password: password,
      email: email,
      accType: type
    };
    return new Promise((res, rej) => {
      this.http.post(this.userDomain + '/signup', body).subscribe(data => {
        if(data['status'] == 1){
          res(data);
        }else{
          rej(data);
        }
      });
    });
  }

  public getUser(path: string, params: any, success: number, addToken: boolean = true): Promise<any> {
    let headers = new HttpHeaders();
    let httpParams = new HttpParams();
    Object.keys(params).forEach(val => {
      httpParams = httpParams.append(val, params[val]);
    });
    if(addToken){
      headers = headers.append('token', UserState.getInstance().token);
    }
    console.log(headers);
    return new Promise((resolve, reject) => {
      this.http.get(this.userDomain + path, { params: httpParams, headers: headers}).subscribe(data => {
        if(data['status'] == success) {
          resolve(data);
        } else {
          reject(data);
        }
      })
    });
  }
}
