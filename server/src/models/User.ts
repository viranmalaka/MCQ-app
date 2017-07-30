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
	accType : {type : String},                       // 'A', 'S', 'D', 'T'
	accId : {type : Schema.Types.ObjectId},
	email : {type : String, unique: true},
	firstName : {type :String},
	lastName : {type :String},
	address : {type : String},
	telephone : {type : String},
	profilePicture : {type : String},
	resetPasswordToken: {type : String},
	resetPasswordExpires: {type : Date}
});

let dataEntrySchema: Schema = new Schema({
	papers : {type: Schema.Types.ObjectId, ref : 'Paper'}
});

let studentSchema : Schema = new Schema({
	school : {type: Schema.Types.ObjectId, ref : 'School'},
	enroll : [{type :Schema.Types.ObjectId, ref : 'Subject'}],
	classGroup : [{type : Schema.Types.ObjectId,ref : 'ClassGroup'}],
	birthday : {type :Date}
});

let teacherSchema : Schema = new Schema({
	visibleName : {type : String},
	subject : [{type :Schema.Types.ObjectId, ref : 'Subject'}],
	classGroup : [{type : Schema.Types.ObjectId,ref : 'ClassGroup'}],
	confirmed : {type : Boolean, required : true, default : false}
});

export interface IUser extends IBase{
	username ?: String,
	password ?: string,
	accType ?: string,                       // 'A', 'S', 'D', 'T'
	accId ?: string,
	email ?: string,
	firstName ?: string,
	lastName ?: string,
	address ?: String,
	telephone ?: String,
	profilePicture ?: String,
	resetPasswordToken?: String,
	resetPasswordExpires?: Date
}

export interface IDataEntry extends IBase{
	paper ?: any,
}

export interface IStudent extends IBase{
	school ?: any,
	enroll ?: any,
	classGroup ?: any,
	birthday ?: Date,
}

export interface ITeacher extends IBase{
	visibleName ?: string,
	subject ?: Array<any>,
	classGroup ?: Array<any>,
	confirmed ?: boolean,
}

export interface IUserModel extends IUser, IBaseModel{}
export interface IDataEntryModel extends IDataEntry, IBaseModel{}
export interface ITeacherModel extends ITeacher, IBaseModel{}
export interface IStudentModel extends IStudent, IBaseModel{}

export const DataEntry : Model<IDataEntryModel> = dbCon.model<IDataEntryModel>("DataEntry", dataEntrySchema);

export const Teacher : Model<ITeacherModel> = dbCon.model<ITeacherModel>("Teacher", teacherSchema);

export const Student : Model<IStudentModel> = dbCon.model<IStudentModel>("Student", studentSchema);

export const User : Model<IUserModel> = dbCon.model<IUserModel>("User", userSchema);
