import {NextFunction, Request, Response, Router} from "express";
import {BaseController} from "../controllers/base-controller";
import {Student} from "../models/User";
import {Base} from "../models/BaseModel";
import {DBController} from "../controllers/db-controller";
/**
 * Created by malaka on 7/21/17.
 */

export class BaseRouter {

  constructor() {

  }

  public create(router: Router, type, rules) {
    router.get('/', this.find(type, {}));
    router.get('/count', this.count(type));
    // router.post('/find', this.complexFind(type, option));
    router.post('/', this.add(type, rules));
    router.put('/:id', this.update(type));
    router.delete('/:id', this.remove(type));

    return router;
  }

  private find(type, options) {
    return function (req: Request, res: Response, next: NextFunction) {

      // collect request data
      let sort = '', select = '';
      if(req.query['_sort']){
        sort = req.query['_sort'].split(',').join(' ');
        delete req.query['_sort'];
      }
      if(req.query['_select']){
        select = req.query['_select'].split(',').join(' ');
        delete req.query['_select'];
      }

      // validate request user actions
      if(req.user){
      	if(req.user.accType === 'A'){ // for admin
		      if(req.query['_id']){
			      new BaseController(type).findById(req.query['_id'], select, (err, results) => {
				      if(err) return next(err);
				      res.jsonp({status:200, result: results});
			      });
		      }else{
			      new BaseController(type).find(req.query, sort, select, (err, result) => {
				      if(err) return next(err);
				      res.jsonp({status:200, result: result});
			      })
		      }
	      }else{                        // for normal users
		      if(req.query['_id']){
		      	if(req.query['_id'] === req.user._id){    // for his account
				      new BaseController(type).findById(req.query['_id'], select, (err, results) => {
					      if(err) return next(err);
					      res.jsonp({status:200, result: results});
				      });
			      }else{                      // for another account
				      new BaseController(type).findById(req.query['_id'],
					      this.generateSelectQuery(select, options.disableFields),
					      (err, results) => {
					        if(err) return next(err);
					        res.jsonp({status:200, result: results});
				        });
			      }
		      }else{
			      new BaseController(type).find(req.query, sort, select, (err, result) => {
				      if(err) return next(err);
				      res.jsonp({status:200, result: result});
			      })
		      }
	      }
      } else { // guests

      }
    };
  }

  private complexFind(type){
    return (req: Request, res: Response, next: NextFunction) => {
      // body can contain query, projection, sort.
      new BaseController(type).find(req.body['query'], req.body['select'], req.body['sort'], (err, results) => {
      	if(err) return next(err);
      	res.jsonp({status: 200, results : results});
      });
    }
  }

  private add(type, rules){
    return function (req: Request, res: Response, next: NextFunction) {
      new BaseController(type).add(req.body, rules, (err, result) =>{
      	console.log('base router add');
      	console.log(err);
      	console.log(result);
        if(err) return next({message : err});
        res.jsonp({status: 201, result: result});
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
          if(result.n < 1 ){ return res.jsonp({status: 404})}
          if(result.nModified < 1) { return res.jsonp({status: 304})}
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
        if(!doc) {return res.jsonp({status : 404})}
        res.jsonp({status: 204, result: doc});
      })
    }
  }

  private count(type){
  	return (req: Request, res: Response, next: NextFunction) => {
  		new BaseController(type).count(req.query, (err, count) => {
  			if(err) return next(err);
  			res.jsonp({status : 200, count: count});
		  })
	  }
  }


	private generateSelectQuery(select, options: Array<string>){

	}
}

export enum Actions{
  Find,
  Create,
  Update,
  Remove,
}