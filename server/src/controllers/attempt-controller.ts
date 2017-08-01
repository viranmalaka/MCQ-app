/**
 * Created by malaka on 7/31/17.
 */

import {BaseController} from "./base-controller";
import {IAttempt} from "../models/Attempt";

export class AttemptController extends BaseController{

  public modelValidator(data: IAttempt): any{
    return null;
  }

}