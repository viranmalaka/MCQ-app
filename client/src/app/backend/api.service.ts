/**
 * Created by malaka on 10/10/17.
 */

import {Injectable} from "@angular/core";
import {SchoolService} from "./school/shool.service";
import {UserService} from "./users/user.service";
import {ToastService} from "./toastr.service";
@Injectable()
export class APIService {

  private toastOptions = {
    enable: false,
    onError: false,
    onSuccess: false,
  };
  constructor(private toast: ToastService,
              private schoolService: SchoolService,
              private userService: UserService) {
  }

  public sendGet(service: Services, path: string, dataPath?: Array<string>, options?: any, success?: number, auth?: boolean): Promise<any> {
    return this.handleToast(
      this.getHandler(service).apiGet(this.getPath(service) + path, dataPath, options, auth, success)
    );
  }

  public sendPost(service: Services, path:string, body: any, dataPath?: Array<string>, options?: any, success ?: number, auth?: boolean) : Promise<any>{
    return this.handleToast(
      this.getHandler(service).apiPost(this.getPath(service) + path, body, dataPath, options, auth, success)
    );
  }

  public sendPut(service: Services, path:string, body: any, dataPath?: Array<string>, options?: any, success ?: number, auth?: boolean) : Promise<any>{
    return this.handleToast(
      this.getHandler(service).apiPut(this.getPath(service) + path, body, dataPath, options, auth, success)
    );
  }

  public sendDelete(service: Services, path:string, dataPath?: Array<string>, options?: any, success ?: number, auth?: boolean) : Promise<any>{
    return this.handleToast(
      this.getHandler(service).apiDelete(this.getPath(service) + path, dataPath, options, auth, success)
    );
  }

  public callCustom(service: Services, func: string): Promise<any> {
    return this.handleToast(
      this.getHandler(service)[func]()
    );
  }

  public setToastEnable(val: boolean){ this.toastOptions.enable = val};
  public setToastOnError(val: boolean){ this.toastOptions.onError = val};
  public setToastOnSuccess(val: boolean){ this.toastOptions.onSuccess = val};

  private handleToast(promise: Promise<any>): Promise<any> {
    if(this.toastOptions.enable){
      return new Promise((resolve, reject) => {
        promise.then(data => {
          if(this.toastOptions.onSuccess){
            this.toast.toast().success('Success') // TODO extendable
          }
          resolve(data);
        }).catch(error => {
          if(this.toastOptions.onError){
            // TODO identify the error code
            this.toast.toast().success('Error') // TODO extendable
          }
          reject(error);
        })
      });
    } else {
      return promise;
    }
  }

  private getHandler(service: Services): any{
    switch (service) {
      case Services.SCHOOL:
        return this.schoolService;
      case Services.USER:
        return this.userService;
    }
  }

  private getPath(service: Services): string{
    switch (service) {
      case Services.SCHOOL:
        return 'school/';
      case Services.USER:
        return 'user/';
    }
  }
}

export enum Services{
  SCHOOL,
  USER,
}
