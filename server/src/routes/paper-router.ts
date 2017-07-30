/**
 * Created by malaka on 7/29/17.
 */

import {BaseRouter} from "./base-router";
import {Router} from "express";
import {Paper} from "../models/Paper";

export class PaperRouter {
  private baseRouter: BaseRouter;

  constructor(){
    this.baseRouter = new BaseRouter();
  }

  public create(router: Router): Router{
    router.get('/test', function (req, res) {
      res.send("in paper");
    });
    return this.baseRouter.create(router, Paper);

  }
}