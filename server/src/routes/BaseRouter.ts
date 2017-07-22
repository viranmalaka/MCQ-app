import {NextFunction, Request, Response, Router} from "express";
import {BaseController} from "../controllers/BaseController";
/**
 * Created by malaka on 7/21/17.
 */

export class BaseRouter {

  constructor(private type, private router: Router) {
  }

  public create() {
    this.router.get('/get', this.getAll(this));
    return this.router;
  }

  private getAll(that) {
    return function (req: Request, res: Response, next: NextFunction) {
      new BaseController(that.type).find({}, (err, result) => {
        res.jsonp(result);
      })
    };
  }
}

export enum Actions{
  Find,
  Create,
  Edit,
  Delete
}