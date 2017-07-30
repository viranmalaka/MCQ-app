/**
 * Created by malaka on 7/29/17.
 */
import {Model, Schema} from "mongoose";
import {DBController} from "../controllers/db-controller";
import {IBase, IBaseModel} from "./BaseModel";
const dbCon = DBController.getInstance().getConnection();


let paperSchema: Schema = new Schema({
	alias: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	medium: {type: String},                        // {'S','E','T'}
	subject: {type: Schema.Types.ObjectId, ref: 'Subject'},
	timeLimit: {type: Number, required: true},   // in minutes
	unitMark: {type: Number, default: 1},
	questions: {type: Number, required: true},
	finished: {type: Boolean, default: false},
	choicesCount: {type: Number, required: true},
	questionMix : {type: Boolean, default: true},
	addedBy: {type: Schema.Types.ObjectId, ref: 'User'},
	description: {type: String},
	isPastPaper: {type: Boolean}
});

export interface IPaper extends IBase {
	alias ?: string,
	name ?: string,
	medium ?: string,
	subject ?: string,
	timeLimit ?: number,
	unitMark ?: number,
	questions : Array<any>,
	finished ?: boolean,
	choicesCount ?: number,
	questionMix ?: boolean,
	addedBy ?: string,
	description ?: string,
	isPastPaper ?: boolean,
}

export interface IPaperModel extends IPaper, IBaseModel {
}
export const Paper: Model<IPaperModel> = dbCon.model<IPaperModel>("Paper", paperSchema);
