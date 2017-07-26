import {BaseRouter} from "./BaseRouter";
import {Router} from "express";
import {School} from "../models/School";
import {Actions} from "./BaseRouter";
/**
 * Created by malaka on 7/21/17.
 */
export class SchoolRouter {
  private baseRouter: BaseRouter;

  constructor(){
    this.baseRouter = new BaseRouter();
  }

  public create(router: Router): Router{
    return this.baseRouter.create(router, School, [Actions.Find]);
  }
}