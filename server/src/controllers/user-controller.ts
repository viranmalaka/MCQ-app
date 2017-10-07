import {BaseController} from "./base-controller";
import {DataEntry, IDataEntry, IStudent, ITeacher, IUser, Student, Teacher, User} from "../models/User";
import * as bcryptjs from "bcryptjs";

/**
 * Created by MalakaD on 7/26/2017.
 */

export class UserController extends BaseController {

	public static rules = {
		username: [
			{ fun :'isEmpty', expected: false, msg: 'User name is required' },
			{ fun: 'isAlphanumeric', msg: 'Invalid name' },
			{ fun: 'isLength', inputs: { min: 6, max: 20 }, msg: 'User name should be in range 6 to 20' }
		],
		email : [
			{ fun: 'isEmail', msg: 'Invalid Email' },
		],
		firstName : [
			{ fun: 'isEmpty', expected: false, msg: 'first name is required'}
		],
	};

	public createUser(data: IUser, next) {
		let valErrors = super.modelValidator(data, UserController.rules);
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
						if (user.accType == 'S') {
							let thisStudent = new Student();
							thisStudent['parent'] = user._id;
							return thisStudent.save((err, std) => {
								if (err) return next(err);
								user.accId = std._id;
								return user.save(next);
							})
						} else if (user.accType == 'T') {
							let thisTeacher = new Teacher();
							thisTeacher['parent'] = user._id;
							thisTeacher.save((err, tch) => {
								if (err) return next(err);
								user.accId = tch._id;
								return user.save(next);
							})
						} else if (user.accType == "D") {
							let thisDataEntry = new DataEntry();
							thisDataEntry['parent'] = user._id;
							thisDataEntry.save((err, de) => {
								if (err) return next(err);
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

export class DataEntryController extends BaseController {

	public modelValidator(data: IDataEntry): any {
		return null;
	}

}

export class TeacherController extends BaseController {
	public static rules = {};

	public modelValidator(data: ITeacher): any {
		return null;
	}

}

export class StudentController extends BaseController {
	public static rules = {};
	public modelValidator(data: IStudent): any {
		return null;
	}

}
