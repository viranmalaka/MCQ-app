import {BaseController} from "./base-controller";
import {DataEntry, IDataEntry, IStudent, ITeacher, IUser, Student, Teacher, User} from "../models/User";
import * as bcryptjs from "bcryptjs";

/**
 * Created by MalakaD on 7/26/2017.
 */

export class UserController extends BaseController {

  public modelValidator(date: IUser): any {
    return null;
  }

  public createUser(data: IUser, next) {
    let valErrors = this.modelValidator(data);
    if (valErrors) {           // check for any validation errors
      return next({value: valErrors});
    } else {
      let newUser = new User({                // create new user
        username: data.username,
        password: data.password,
        email: data.email,
        accType: data.accType.toUpperCase()
      });
      bcryptjs.genSalt(10, (err, salt) => {                          // generate salt to encrypt
        bcryptjs.hash(newUser.password, salt, (err, hash) => {     // generate has with salt
          newUser.password = hash;                                    // replace hash with password
          newUser.save((err, user) => {                         // save the user
	          if (err) return next(err);
	          if(user.accType == 'S'){
	            let thisStudent = new Student();
            	return thisStudent.save((err, std) => {
            		if(err) return next(err);
                user.accId = std._id;
                return user.save(next);
            	})
            }else if(user.accType == 'T'){
            	let thisTeacher = new Teacher();
            	thisTeacher.save((err, tch) => {
								if(err) return next(err);
                user.accId = tch._id;
                return user.save(next);
            	})
            }else if(user.accType == "D"){
            	let thisDataEntry = new DataEntry();
            	thisDataEntry.save((err, de) => {
								if(err) return next(err);
                user.accId = de._id;
                return user.save(next);
            	})
            }
          });
        })
      });
    }
  }

  public static comparePassword(candidatePassword: string, hash: string, cb: Function) {
    bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) {
        console.log(err);
      } else {
        cb(null, isMatch);
      }
    });
  };


}

export class DataEntryController extends BaseController{

  public modelValidator(data: IDataEntry): any{
    return null;
  }

}

export class TeacherController extends BaseController{

  public modelValidator(data: ITeacher): any{
    return null;
  }

}

export class StudentController extends BaseController{

  public modelValidator(data: IStudent): any{
    return null;
  }

}
