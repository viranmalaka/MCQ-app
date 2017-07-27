import {BaseController} from "./base-controller";
import {IUser, User} from "../models/User";
import * as bcryptjs from "bcryptjs";

/**
 * Created by MalakaD on 7/26/2017.
 */

export class UserController extends BaseController {

  public modelValidator(date: IUser): any {
    return null;
  }

  public createUser(data: IUser, next: Function) {
    let valErrors = this.modelValidator(data);
    if (valErrors) {                           // check for any validation errors
      next(valErrors);
    } else {
      let newUser = new User({                // create new user
        username: data.username,
        password: data.password,
        email: data.email,
        acc_type: data.acc_type
      });

      bcryptjs.genSalt(10, (err, salt) => {                          // generate salt to encrypt
        bcryptjs.hash(newUser.password, salt, (err, hash) => {     // generate has with salt
          newUser.password = hash;                                    // replace hash with password
          newUser.save((err, user) => {                         // save the user
            if (err) next(err);
            next(user);
            // if(user.acc_type == 'S'){
            // 	let thisStudent = new Student();
            // 	thisStudent.save(function (err, std) {
            // 		if(err){
            // 			console.log(err);
            // 			throw err;
            // 		}else{
            // 			user.acc_id = std._id;
            // 			user.save(cb);
            // 		}
            // 	})
            // }else if(user.acc_type == 'T'){
            // 	var thisTeacher = new Teacher();
            // 	thisTeacher.save(function (err, tch) {
            // 		if(err){
            // 			console.log(err);
            // 			throw err;
            // 		}else{
            // 			user.acc_id = tch._id;
            // 			user.save(cb);
            // 		}
            // 	})
            // }else if(user.acc_type == "D"){
            // 	var thisDataEntry = new DataEntry();
            // 	thisDataEntry.save(function (err, de) {
            // 		if(err){
            // 			console.log(err);
            // 			throw err;
            // 		}else{
            // 			user.acc_id = de._id;
            // 			user.save(cb);
            // 		}
            // 	})
            // }
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