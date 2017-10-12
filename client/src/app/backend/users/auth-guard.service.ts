/**
 * Created by malaka on 9/24/17.
 */

import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserState} from "./user-state";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return UserState.getInstance().isAuthenticated;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return UserState.getInstance().isAuthenticated;
  }

}
