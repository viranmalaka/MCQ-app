import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../backend/users/user.service";
import {UserState} from "../../backend/users/user-state";

@Component({
  selector: 'mcq-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public loginFailed: boolean;
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      uname: [null , Validators.compose ( [ Validators.required ] )] ,
      password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    this.userService.postLogin(this.form.value['uname'], this.form.value['password']).then(data => {
      const userState = UserState.getInstance();
      userState.user = data.user;
      userState.token = data.token;
      this.router.navigate([data.user.username]);
    }).catch(err => {
      this.form.reset();
      this.loginFailed = true;
    })
  }
}
