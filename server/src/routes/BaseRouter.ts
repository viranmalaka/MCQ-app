import {NextFunction, Request, Response, Router} from "express";
import {BaseController} from "../controllers/BaseController";
/**
 * Created by malaka on 7/21/17.
 */

export class BaseRouter {

  constructor() {

  }

  public create(router: Router, type, block: Array<Actions> = []) {
    if(block.indexOf(Actions.Find) == -1) router.get('/', this.find(type));
    if(block.indexOf(Actions.Create) == -1) router.post('/', this.add(type));
    if(block.indexOf(Actions.Update) == -1) router.put('/:id', this.update(type))
    if(block.indexOf(Actions.Remove) == -1) router.delete('/:id', this.remove(type));

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
        new BaseController(type).findById(req.query['_id'], select, (err, results) => {
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
      new BaseController(type).add(req.body, (err, result) =>{
        if(err) return next(err);
        res.jsonp({result: result});
      });
    }
  }

  private update(type){
    return (req : Request, res : Response, next : NextFunction) => {
      let id = req.params['id'];
      if(id){
        delete req.body['_id'];
        new BaseController(type).editById(id, req.body, (err, result) => {
          if(err) return next(err);
          res.jsonp({result: result});
        });
      }
    }
  }

  private remove(type){
    return (req: Request, res: Response, next: NextFunction) => {
      let id = req.params['id'];
      new BaseController(type).remove(id, (err, doc) => {
        if(err) return next(err);
        res.jsonp({result: doc});
      })
    }
  }
}

export enum Actions{
  Find,
  Create,
  Update,
  Remove,
}