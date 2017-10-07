import {BaseRouter} from "./base-router";
import {Router} from "express";
import {School} from "../models/School";
import {SchoolController} from "../controllers/school-controller";
/**
 * Created by malaka on 7/21/17.
 */
export class SchoolRouter {
  private baseRouter: BaseRouter;

  constructor(){
    this.baseRouter = new BaseRouter();
  }

  public create(): Router{
	  let router: Router = Router();

    return this.baseRouter.create(router, School, SchoolController.routerConfig);
  }
}