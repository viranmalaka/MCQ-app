/**
 * Created by malaka on 7/31/17.
 */
import { Schema, Model } from "mongoose";
import { DBController } from "../controllers/db-controller";
import { IBase, IBaseModel } from "./BaseModel";
const dbCon = DBController.getInstance().getConnection();

let notificationSchema: Schema = new Schema({
	users : [{type: Schema.Types.ObjectId, required: true}],
	body : {type : {}}
});

export interface INotification extends IBase{
  users: Array<string>,
	body: any,
}

export interface INotificationModel extends INotification, IBaseModel{}

export const Notification : Model<INotificationModel> = dbCon.model<INotificationModel>("Notification", notificationSchema);