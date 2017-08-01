/**
 * Created by malaka on 7/31/17.
 */

import { Schema, Model } from "mongoose";
import { DBController } from "../controllers/db-controller";
import { IBase, IBaseModel } from "./BaseModel";
const dbCon = DBController.getInstance().getConnection();

let attemptSchema: Schema = new Schema({
	student : {type: Schema.Types.ObjectId,ref : 'Student'},
	paper : {type: Schema.Types.ObjectId, ref : 'Paper'},        // if not null it is paper attempt
	answers : {type : [{}]},                                     // {qId, answer, viewAt, lastEdit}
	startingTime  : {type : Date},
	endingTime : {type :Date}
});

export interface IAttempt extends IBase{
	student: string,
	paper: string,
	answers : Array<any>,
	startingTime : Date,
	endingTime : Date,
}

export interface IAttemptModel extends IAttempt, IBaseModel{}

export const Attempt : Model<IAttemptModel> = dbCon.model<IAttemptModel>("Attempt", attemptSchema);