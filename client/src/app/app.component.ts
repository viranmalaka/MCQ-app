import {Component, ViewContainerRef} from "@angular/core";
import {UserService} from "./backend/users/user.service";
import {UserState} from "./backend/users/user-state";
import {ToastService} from "./backend/toastr.service";
import {Router} from "@angular/router";

@Component({
  selector: 'mcq-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  public constructor(private router: Router, private userService: UserService, private toastrService: ToastService, vcr: ViewContainerRef){
    this.userService.readyToStartApp = new Promise(res => {
      this.toastrService.setVCR(vcr);
      if(this.userService.readAuthCookie()){
        this.userService.getTokenUser().then(data => {
          UserState.getInstance().user = data['user'];
          res(true);
        }).catch(err => {
          // redirect to login
          this.router.navigate(['login']);
        })
      } else {
        res(true);
      }
    });
  }
}
