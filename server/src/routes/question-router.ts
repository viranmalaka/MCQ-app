/**
 * Created by malaka on 7/30/17.
 */

import {BaseRouter} from "./base-router";
import {Router} from "express";
import {Question} from "../models/Question";

export class QuestionRouter {
  private baseRouter: BaseRouter;

  constructor(){
    this.baseRouter = new BaseRouter();
  }

  public create(router: Router): Router{
    return this.baseRouter.create(router, Question);
  }
}