import {Component, OnInit} from "@angular/core";
import {UserService} from "../../backend/users/user.service";
import {UserState} from "../../backend/users/user-state";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../backend/toastr.service";
import {SchoolService} from "../../backend/school/shool.service";

@Component({
  selector: 'mcq-social-test',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public options: any;
  public user: any = {};
  public extendedUser: any = {
    school : {}
  };
  public userEditForm: FormGroup = new FormGroup({});
  public bioFieldsErrors = {};
  public districtList = [];
  public schoolList = [];
  private editModalRef: NgbModalRef;

  public telephoneMask = {
    mask: [/[0]/, /[1-9]/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    placeholder: '088 888-8888'
  };

  constructor(private schoolService: SchoolService, private userService: UserService, private modalService: NgbModal, private fb: FormBuilder, private ts: ToastService) {
    this.userEditForm = this.fb.group({
      username: ['', [Validators.required, Validators.min(6), Validators.max(20)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: [''],
      address: this.user['address'],
      telephone: this.user['telephone'],
      aboutMe: this.user['aboutMe'],
    });

    this.userService.readyToStartApp.then(relove => {
      this.user = UserState.getInstance().user;
      this.userService.getUser('',{_id: this.user['_id']}, 4, true).then(data => {
        this.user = data['result'];
        this.userEditForm.setValue({
          username: this.user['username'],
          email: this.user['email'],
          firstName: this.user['firstName'] || '',
          lastName: this.user['lastName'] || '',
          address: this.user['address'] || '',
          telephone: this.user['telephone'] || '',
          aboutMe: this.user['aboutMe'] || '',
        })
      });
      if (this.user['accType'] == 'S') {
        this.userService.getUser('/sub/student', {_id: this.user['accId'], '_populate': 'school'}, 4, true).then(data => {
          this.extendedUser = data['result'];
        }).catch(err => {
          console.log('eee', err);
        });
        this.readyStudentBio();
      }

    });
  }

  ngOnInit() {

  }

  public onUserEditSubmit(): void{
    Object.keys(this.userEditForm.controls).forEach(key => {
      this.userEditForm.controls[key].markAsTouched({ onlySelf: true });
    });
    if(this.userEditForm.valid) {
      this.userService.putUserDetails(this.userEditForm.getRawValue()).then(data => {
        UserState.getInstance().user = data['result'];
        this.user = UserState.getInstance().user;
        this.editModalRef.close();
        this.ts.toast().success('Success fully updated your data');
      }).catch(res => {
        this.ts.toast().error(res, "Error");
      });
    }
  }

  openUserDetailsEditModal(content) {
    this.editModalRef = this.modalService.open(
      content,
      {
        backdrop: "static",
        keyboard: false
      }
    );
    this.editModalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  public formValidity(controller: string, error?: string): any {
    const con = this.userEditForm.get(controller);
    if(error){
      return con.errors && con.errors[error] && con.touched;
    }else {
      return (con.invalid && con.touched);
    }
  }

  public editOneField(fieldName: string, value: any): void {
    this.bioFieldsErrors[fieldName] = {};
    const changedValue = {};
    changedValue[fieldName] = value;
    this.userService.putOneUserDetails(changedValue).then(data => {
      UserState.getInstance().user[fieldName] = data[fieldName];
      this.user[fieldName] = data[fieldName];
    }).catch(error => {
      if(error['status'] === 16){
        this.bioFieldsErrors[fieldName] = { hasError: true, msg: error['msg'][fieldName]['message'][0] }
      }
    });
  }

  public readyStudentBio() : void {
    this.schoolService.getAllDistrict().then(list => {
      this.districtList = list;
    }).catch(error => {
      this.ts.toast().error(error['msg']);
    });
    this.schoolService.getSchools().then(list => {
      this.schoolList = list;
    }).catch(error => {
      this.ts.toast().error(error['msg']);
    });
  }

  public selectDistrict(dic: string): void {
    this.schoolService.getSchools(dic).then(list => {
      this.schoolList = list;
    }).catch(error => {
      this.ts.toast().error(error['msg']);
    });
  }

  public selectSchool(sch: string) : void {
    this.userService.putOneStudentDetails({school : sch}).then(() => {
      this.userService.getUser('/sub/student', {_id: this.user['accId'], '_populate': 'school'}, 4, true).then(data => {
        this.extendedUser = data['result'];
      })
    }).catch(error => {
      if(error['status'] === 16){
        this.ts.toast().error('Error');
      }
    });
  }
}
