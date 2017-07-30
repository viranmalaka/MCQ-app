/**
 * Created by malaka on 7/30/17.
 */

import {BaseController} from "./base-controller";
import {IQuestion} from "../models/Question";

export class QuestionController extends BaseController{

  public modelValidator(data: IQuestion): any{
    return null;
  }

}