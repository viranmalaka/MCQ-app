/**
 * Created by malaka on 7/31/17.
 */

import { Schema, Model } from "mongoose";
import { DBController } from "../controllers/db-controller";
import { IBase, IBaseModel } from "./BaseModel";
const dbCon = DBController.getInstance().getConnection();

let classGroupSchema: Schema = new Schema({
	name : {type: String, required: true},
	paper: [{type : Schema.Types.ObjectId,ref : 'Paper'}]
});

export interface IClassGroup extends IBase{
  name: string,
	paper: Array<any>,
}

export interface IClassGroupModel extends IClassGroup, IBaseModel{}

export const ClassGroup : Model<IClassGroupModel> = dbCon.model<IClassGroupModel>("ClassGroup", classGroupSchema);