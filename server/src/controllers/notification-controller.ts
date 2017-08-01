/**
 * Created by malaka on 7/31/17.
 */

import {BaseController} from "./base-controller";
import {INotification} from "../models/Notification";

export class NotificationController extends BaseController{

  public modelValidator(data: INotification): any{
    return null;
  }

}