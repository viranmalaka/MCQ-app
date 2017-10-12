/**
 * Created by malaka on 9/2/17.
 */

export class UserState {
  private _isAuthenticated: boolean;
  private _user : any;
  private _token : string;
  private _id : string;

  private static instance: UserState;

  private constructor(){

  }

  public static getInstance(): UserState{
    if(!this.instance){
      this.instance = new UserState();
    }
    return this.instance;
  }

  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }
}

