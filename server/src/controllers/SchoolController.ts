import {BaseController} from "./BaseController";
import {ISchool} from "../models/School";
/**
 * Created by malaka on 7/21/17.
 */

export class SchoolController extends BaseController{

  public modelValidator(data: ISchool): any{
    console.log('validator from school');
    return null;
  }

}