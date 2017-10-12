/**
 * Created by malaka on 10/12/17.
 */

import {APIBackEnd} from "./api.backend.service";

export class APICaller {
  constructor(private serverCall: APIBackEnd) {

  }

  public apiGet(path: string, require?: Array<string>, options?: any, auth?: boolean, success?: number): Promise<any> {
    return this.handle(this.serverCall.sendGet(path, options, auth, success), require);
  }

  public apiPost(path: string, body: any, require?: Array<string>, options?: any, auth?: boolean, success?: number): Promise<any> {
    return this.handle(this.serverCall.sendPost(path, body, options, auth, success), require);
  }

  public apiPut(path: string, body: any, require?: Array<string>, options?: any, auth?: boolean, success?: number): Promise<any> {
    return this.handle(this.serverCall.sendPut(path, body, options, auth, success), require);
  }

  public apiDelete(path: string, require?: Array<string>, options?: any, auth?: boolean, success?: number): Promise<any> {
    return this.handle(this.serverCall.sendDelete(path, options, auth, success), require);
  }

  private handle(promise: Promise<any>, require?: Array<string>) {
    return new Promise((resolve, reject) => {
      promise.then(data => {
        if (require && require !== undefined && require.length > 0) {
          require.forEach(key => {
            data = data[key];
          });
          resolve(data);
        } else {
          resolve(data);
        }
      }).catch(error => {
        reject(error);
      })
    })
  }
}
