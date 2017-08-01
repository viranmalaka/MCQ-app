/**
 * Created by malaka on 7/31/17.
 */

import { Schema, Model } from "mongoose";
import { DBController } from "../controllers/db-controller";
import { IBase, IBaseModel } from "./BaseModel";
const dbCon = DBController.getInstance().getConnection();

let subjectSchema: Schema = new Schema({
	name : {type: String, required: true},
	topics : {type : [{}]}                  // {{id , name}}
});

export interface ISubject extends IBase{
	name : string,
	topics: Array<any>,
}

export interface ISubjectModel extends ISubject, IBaseModel{}

export const Subject : Model<ISubjectModel> = dbCon.model<ISubjectModel>("Subject", subjectSchema);
