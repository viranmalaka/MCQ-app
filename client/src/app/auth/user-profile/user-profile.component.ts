import {Component, OnInit} from "@angular/core";
import {UserService} from "../../backend/users/user.service";
import {UserState} from "../../backend/users/user-state";

@Component({
  selector: 'mcq-social-test',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  public options : any;
  public user: any;
  public extendedUser: any;
  images: any[] = [];
  num = 1;

  constructor(private userService: UserService) {
    for ( this.num; this.num <= 18; this.num += 1 ) {
      this.images.push( this.num );
    }
    this.user = UserState.getInstance().user;
  }

  ngOnInit() {
    if(this.user.accType == 'S'){
      this.userService.getUser('/sub/student', {_id : this.user['accId']}, 1, true).then(data => {
        console.log(data);
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
