/**
 * Created by malaka on 7/21/17.
 */

import { Document } from "mongoose";
import { Model } from "mongoose";

export interface IBase{

}

export interface IBaseModel extends IBase, Document{

}

export const Base : Model<IBaseModel> = null;
