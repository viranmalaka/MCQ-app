/**
 * Created by malaka on 9/2/17.
 */

import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";


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
}
