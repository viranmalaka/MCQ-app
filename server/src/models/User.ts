/**
 * Created by MalakaD on 7/26/2017.
 */

import { Schema, Model } from "mongoose";
import { DBController } from "../controllers/db-controller";
import { IBase, IBaseModel } from "./BaseModel";
const dbCon = DBController.getInstance().getConnection();

let userSchema: Schema = new Schema({
	username: {type: String, required: true, unique : true},
	password : {type: String, required: true},
	acc_type : {type : String},                       // 'A', 'S', 'D', 'T'
	acc_id : {type : Schema.Types.ObjectId},
	email : {type : String, unique: true},
	first_name : {type :String},
	last_name : {type :String},
	address : {type : String},
	telephone : {type : String},
	profile_picture : {type : String},
	reset_password_token: {type : String},
	reset_password_expires: {type : Date}
});

export const User : Model<IUserModel> = dbCon.model<IUserModel>("User", userSchema);

export interface IUser extends IBase{
	username ?: String,
	password ?: string,
	acc_type ?: string,                       // 'A', 'S', 'D', 'T'
	acc_id ?: string,
	email ?: string,
	first_name ?: string,
	last_name ?: string,
	address ?: String,
	telephone ?: String,
	profile_picture ?: String,
	reset_password_token?: String,
	reset_password_expires?: Date
}

export interface IUserModel extends IUser, IBaseModel{}