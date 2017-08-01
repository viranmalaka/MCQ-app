/**
 * Created by malaka on 7/31/17.
 */

import {BaseController} from "./base-controller";
import {ISubject} from "../models/Subject";

export class SubjectController extends BaseController{

  public modelValidator(data: ISubject): any{
    return null;
  }

}