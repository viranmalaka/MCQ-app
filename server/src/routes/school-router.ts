import {BaseRouter} from "./base-router";
import {Router} from "express";
import {School} from "../models/School";
/**
 * Created by malaka on 7/21/17.
 */
export class SchoolRouter {
  private baseRouter: BaseRouter;

  constructor(){
    this.baseRouter = new BaseRouter();
  }

  public create(router: Router): Router{
    return this.baseRouter.create(router, School);
  }
}