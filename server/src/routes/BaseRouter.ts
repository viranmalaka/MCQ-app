import {NextFunction, Request, Response, Router} from "express";
import {BaseController} from "../controllers/BaseController";
/**
 * Created by malaka on 7/21/17.
 */

export class BaseRouter {

  constructor() {

  }

  public create(router: Router, type) {
    router.route('/')
      .get(this.find(type))
      .post(this.add(type));

    router.route('/:id')
      .put(this.update(type));

    return router;
  }

  private find(type) {
    return function (req: Request, res: Response, next: NextFunction) {
      let sort = '', select = '';
      if(req.query['_sort']){
        sort = req.query['_sort'].split(',').join(' ');
        delete req.query['_sort'];
      }
      if(req.query['_select']){
        select = req.query['_select'].split(',').join(' ');
        delete req.query['_select'];
      }
      if(req.query['_id']){
        new BaseController(type).findById(req.query['_id'], (err, results) => {
          if(err) return next(err);
          res.jsonp({result: results});
        });
      }else{
        new BaseController(type).find(req.query, sort, select, (err, result) => {
          if(err) return next(err);
          res.jsonp({result: result});
        })
      }
    };
  }

  private add(type){
    return function (req: Request, res: Response, next: NextFunction) {
      new BaseController(type).add(req.body['data'], (err, result) =>{
        if(err) return next(err);
        res.jsonp({result: result});
      });
    }
  }

  private update(type){
    return (req : Request, res : Response, next : NextFunction) => {
      let id = req.body['_id'];
      if(id){
        delete req.body['_id'];
        new BaseController(type).editById(id, req.body, (err, result) => {
          if(err) return next(err);
          res.jsonp({result: result});
        });
      }
    }
  }


}

export enum Actions{
  Find,
  Create,
  Edit,
  Delete
}