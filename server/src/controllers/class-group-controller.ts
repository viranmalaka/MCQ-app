/**
 * Created by malaka on 7/31/17.
 */

import {BaseController} from "./base-controller";
import {IClassGroup} from "../models/ClassGroup";

export class ClassGroupController extends BaseController{

  public modelValidator(data: IClassGroup): any{
    return null;
  }

}