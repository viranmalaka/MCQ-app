/**
 * Created by malaka on 7/29/17.
 */

import {BaseController} from "./base-controller";
import {IPaper} from "../models/Paper";

export class PaperController extends BaseController{
  public static rules : {

  };

  public modelValidator(data: IPaper): any{
    return null;
  }

}