/**
 * Created by malaka on 7/30/17.
 */
import { Schema, Model } from "mongoose";
import { DBController } from "../controllers/db-controller";
import { IBase, IBaseModel } from "./BaseModel";
const dbCon = DBController.getInstance().getConnection();

let questionSchema: Schema = new Schema({
	body: {type: String, required: true},
	answers: {type: {}},                            // {id : body}
	correct: { type : [String], required: true},    // array of corrected answers ids
	tags: {type : [String]},                        // array of tags
	topics: {type : [String]},                      // array of if of topics from Subject table
	checkedBy: {type : Schema.Types.ObjectId, ref : 'User'},
	difficulty : {type : {}},                       //{studentId, difficultyRate}
	comments: {type : [{}]},                        //{user._id, body, likes[], dislikes[]}
	choicesMix : {type : Boolean, default : true},
	questionNumber : {type : Number, required : true}
});

export interface IQuestion extends IBase{
	body ?: string
	answers ?: Array<any>,        // {id : body}
	correct ?: Array<string>,     // array of corrected answers ids
	tags ?: Array<string>,        // array of tags
	topics ?:  Array<string>,     // array of if of topics from Subject table
	checkedBy ?: string,
	difficulty ? : Array<any>,    //{studentId, difficultyRate}
	comments ?: Array<any>,       //{user._id, body, likes[], dislikes[]}
	choicesMix ? : boolean,
	questionNumber ? : number
}

export interface IQuestionModel extends IQuestion, IBaseModel{}

export const Question : Model<IQuestionModel> = dbCon.model<IQuestionModel>("Question", questionSchema);
