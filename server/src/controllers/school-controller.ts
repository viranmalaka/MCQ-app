import {BaseController} from "./base-controller";
import {ISchool} from "../models/School";
/**
 * Created by malaka on 7/21/17.
 */

export class SchoolController extends BaseController{

  public modelValidator(data: ISchool): any{
    return null;
  }

}