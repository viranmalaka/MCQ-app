import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from "ng2-validation";
import {UserService} from "../../backend/users/user.service";
import {Observable} from "rxjs/Observable";

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'mcq-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group( {
      uname: [null , Validators.compose ( [ Validators.required ] ), this.usernameValidator.bind(this)],
      email: [null , Validators.email, this.emailValidator.bind(this)],
      password: password,
      confirmPassword: confirmPassword,
      teacher: [false],
    } );
  }

  onSubmit() {
    if(this.form.valid){
      const username = this.form.controls['uname'].value;
      const email = this.form.controls['email'].value;
      const password = this.form.controls['password'].value;
      const accType = this.form.controls['teacher'].value ? 'T' : 'S';
      this.userService.postSignUp(username, password, email, accType).then(data => {
        // TODO redirect
      }).catch(err => {

      });
    }
  }

  private usernameValidator(control: FormControl): Promise<any> | Observable<any>{
    return new Promise((resolve, reject) => {
      this.userService.getCountByUserName(control.value).then(data => {
          if(data >= 1){
            resolve({existUserName: true});
          }else{
            resolve(null);
          }
        }).catch(err => {
          resolve({existUserName: true});
        });
    });
  }

  private emailValidator(control: FormControl): Promise<any> | Observable<any>{
    return new Promise((resolve, reject) => {
      this.userService.getCountByEmail(control.value).then(data => {
        if(data >= 1){
          resolve({existEmail: true});
        }else{
          resolve(null);
        }
      }).catch(err => {
        resolve({existEmail: true});
      });
    });
  }

}
