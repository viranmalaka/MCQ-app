import {NextFunction, Request, Response, Router} from "express";
import {BaseController} from "../controllers/base-controller";
import {IUserModel} from "../models/User";
/**
 * Created by malaka on 7/21/17.
 */

export interface Ability{
	c?: boolean,
	r?: Array<string>,
	u?: Array<string>,
	d?: boolean,
}

export interface RouterConfig {
	ownerShip?: string,
	validationRules: any,
	ownerActions?: Ability,
	otherActions?: {S?: Ability, T?: Ability, D?: Ability},
	guestActions?: Ability,
}

export class BaseRouter {

  constructor() {

  }

  public create(router: Router, type, config?: RouterConfig) {
    router.get('/', this.find(type, config));
    // router.post('/find', this.complexFind(type, option));
    router.post('/', this.add(type, config));
    router.put('/:id', this.update(type, config));
    router.put('/:id/edit', this.update(type, config));
    router.delete('/:id', this.remove(type, config));
    router.get('/count', this.count(type, config));

    return router;
  }

  private find(type, options: RouterConfig) {
    return function (req: Request, res: Response, next: NextFunction) {
    	// user
	    let user: IUserModel = req.user,
		    accType = user ? user.accType : undefined;

      // collect request data
      let sort = '', select = '';
      if(req.query['_sort']){
        sort = req.query['_sort'].split(',');
        delete req.query['_sort'];
      }
      if(req.query['_select']){
        select = req.query['_select'].split(',');
        delete req.query['_select'];
      }

      if(user){
      	// authenticated User
	      if(accType == 'A'){  // admin
		      if(req.query['_id']){
			      new BaseController(type).findById(req.query['_id'], select, (err, results) => {
				      if(err) return next(err);
				      res.jsonp({status:4, result: results});
			      });
		      }else{
			      new BaseController(type).find(req.query, sort, select, (err, result) => {
				      if(err) return next(err);
				      res.jsonp({status:4, result: result});
			      })
		      }
	      } else {             // owner + others
		      if (options.ownerShip) {
			      if (req.query['_id']) {
				      new BaseController(type).findById(req.query['_id'], this.commonSelect(select, options.ownerActions.r), (err, results) => {
					      if (err) return next(err);
					      if (results[options.ownerShip] == user._id) {   // check the ownership
						      res.jsonp({status: 4, result: results});
					      } else {    // others
						      if (options.otherActions[accType].r) {
						      	// others can read
							      let responseObj = {};
							      this.commonSelect(select, options.otherActions[accType].r).forEach((x) => {
								      responseObj[x] = results[x];
							      });
							      res.jsonp({status: 4, result: responseObj});
						      } else {
							      // error
							      return next({status : 22, message : 'No privilege to read', from:'base-router: find'});
						      }
					      }
				      });
			      } else {
				      // check the query object has ownership key and validate is with current user.
				      // then return owner actions.
				      // if the query object dosen't have ownership key we provide only otherActions.

				      // ownership validation : (req.query[options.ownerShip] == user._id)
				      if (req.query[options.ownerShip]) { // go to ownership validation
					      if (req.query[options.ownerShip] == user._id) {
						      // owner
						      new BaseController(type).find(req.query, sort, this.commonSelect(select, options.ownerActions.r), (err, result) => {
							      if (err) return next(err);
							      res.jsonp({status: 4, result: result});
						      })
					      } else {
						      // others
						      if (options.otherActions[accType].r) {
							      new BaseController(type).find(req.query, sort, this.commonSelect(select, options.otherActions[accType].r), (err, result) => {
								      if (err) return next(err);
								      res.jsonp({status: 2, result: result});
							      })
						      }else{
						      	// error
							      return next({status : 22, message : 'No privilege to read', from:'base-router: find'});
						      }
					      }
				      } else {
				      	// no ownership validation, give others actions.
					      if(options.otherActions[accType].r){
					      	// others can read
						      new BaseController(type).find(req.query, sort, this.commonSelect(select, options.otherActions[accType].r), (err, result) => {
							      if (err) return next(err);
							      res.jsonp({status: 4, result: result});
						      })
					      }else{
					      	// error
						      return next({status : 22, message : 'No privilege to read', from:'base-router: find'});
					      }
				      }
			      }
		      } else {
			      // others actions
			      if (options.otherActions[accType].r) {
			      	// others can read
				      if (req.query['_id']) {
					      new BaseController(type).findById(req.query['_id'], this.commonSelect(select, options.otherActions[accType].r), (err, results) => {
						      if (err) return next(err);
						      res.jsonp({status: 4, result: results});
					      });
				      } else {
					      new BaseController(type).find(req.query, sort, this.commonSelect(select, options.otherActions[accType].r), (err, result) => {
						      if (err) return next(err);
						      res.jsonp({status: 4, result: result});
					      })
				      }
			      } else {
			      	// error
							return next({status : 22, message : 'No privilege to read', from:'base-router: find'});
			      }
		      }
	      }
      }else {
	      // a guest
	      if (options.guestActions.r) {
		      if (req.query['_id']) {
			      new BaseController(type).findById(req.query['_id'], this.commonSelect(select, options.guestActions.r), (err, results) => {
				      if (err) return next(err);
				      res.jsonp({status: 4, result: results});
			      });
		      } else {
			      new BaseController(type).find(req.query, sort, this.commonSelect(select, options.guestActions.r), (err, result) => {
				      if (err) return next(err);
				      res.jsonp({status: 4, result: result});
			      })
		      }
	      } else {
		      //error
		      return next({status : 21, message : 'No privilege to read', from:'base-router: find'});
	      }
      }
    }.bind(this);
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

  private add(type, options: RouterConfig){
    return function (req: Request, res: Response, next: NextFunction) {
	    if (req.user) {
	    	if(req.user.accType == 'A'){
			    new BaseController(type).add(req.body, options.validationRules, (err, result) => {
				    if (err) return next(err);
				    res.jsonp({status: 2, result: result});
			    });
		    }else{
	    		if(options.otherActions[req.user.accType].c){
				    new BaseController(type).add(req.body, options.validationRules, (err, result) => {
					    if (err) return next(err);
					    res.jsonp({status: 2, result: result});
				    });
			    }else{
				    return next({status : 22, message : 'No privilege to create', from:'base-router: add'});
			    }
		    }
	    } else {
	    	if(options.guestActions.c){
			    new BaseController(type).add(req.body, options.validationRules, (err, result) => {
				    if (err) return next(err);
				    res.jsonp({status: 2, result: result});
			    });
		    }else{
			    return next({status : 21, message : 'No privilege to create', from:'base-router: add'});
		    }
	    }
    }
  }

  // update whole object (owner or admin)
  private update(type, options: RouterConfig){
  	let controller = new BaseController(type);
    return (req : Request, res : Response, next : NextFunction) => {
      let id = req.params['id'];
      if(id){
        delete req.body['_id'];
        controller.findById(id,'', (err, object) => {
        	if(err) return next(err);
	        if (object.length) {
		        if (object[options.ownerShip] == req.user._id || req.user.accType == 'A') {
			        controller.editById(id, req.body, (err, result) => {
				        if (err) return next(err);
				        if (result.n < 1) {
					        return res.jsonp({status: 14})
				        }
				        if (result.nModified < 1) {
					        return res.jsonp({status: 13})
				        }
				        res.jsonp({status: 3, result: result});
			        });
		        } else {
		        	return next({status: 22, message: 'No privilege to update', from:'base-router: update'})
		        }
	        }else{
	        	return next({status: 14, message: 'No such object', from:'base-router: update'})
	        }
        });
      }
    }
  }

  private edit(type, options: RouterConfig){
	  return (req: Request, res: Response, next: NextFunction) => {
		  if (req.user) {
			  if (req.user.accType == 'A') {
				  new BaseController(type).edit(req.params['id'], req.body, options.ownerActions.u, (err, result) => {
					  if (err) return next(err);
					  return res.jsonp({status: 3, result: result});
				  });
			  } else {
				  if (options.otherActions[req.user.accType]) {
					  new BaseController(type).edit(req.params['id'], req.body, options.otherActions[req.user.accType].u, (err, result) => {
						  if (err) return next(err);
						  return res.jsonp({status: 3, result: result});
					  });
				  } else {
				  	return next({status: 22, message:'No privilege to edit', from:'base-router: edit'})
				  }
			  }
		  } else {
			  if (options.guestActions) {
				  new BaseController(type).edit(req.params['id'], req.body, options.guestActions.u, (err, result) => {
					  if (err) return next(err);
					  return res.jsonp({status: 3, result: result});
				  });
			  } else {
				  return next({status: 21, message:'No privilege to edit', from:'base-router: edit'})
			  }
		  }
	  };
  }

  private remove(type, options: RouterConfig){
    return (req: Request, res: Response, next: NextFunction) => {
      let id = req.params['id'];
      if(req.user) {
	      if (req.user.accType == 'A') {
		      new BaseController(type).remove(id, (err, doc) => {
			      if (err) return next(err);
			      if (!doc) {
				      return res.jsonp({status: 14})
			      }
			      res.jsonp({status: 5, result: doc});
		      })
	      } else {
		      new BaseController(type).findById(id, '', (err, doc) => {
			      if (err) return next(err);
			      if (doc) {
				      if (doc[options.ownerShip] == req.user._id) {
					      if (options.ownerActions.d) {
						      new BaseController(type).remove(id, (err, doc) => {
							      if (err) return next(err);
							      if (!doc) {
								      return res.jsonp({status: 14})
							      }
							      res.jsonp({status: 5, result: doc});
						      })
					      } else {
						      return next({status: 22, message: 'No privilege to delete', from:'base-router: remove'});
					      }
				      } else {
					      if (options.otherActions[req.user.accType].d) {
						      new BaseController(type).remove(id, (err, doc) => {
							      if (err) return next(err);
							      if (!doc) {
								      return res.jsonp({status: 14})
							      }
							      res.jsonp({status: 5, result: doc});
						      })
					      } else {
						      return next({status: 22, message: 'No privilege to delete', from:'base-router: remove'});
					      }
				      }
			      } else {
				      return next({status: 14, message: 'No such object', from:'base-router: remove'});
			      }
		      });
	      }
      }else{
      	// guest
	      if(options.guestActions){
	      	if(options.guestActions.d){
			      new BaseController(type).remove(id, (err, doc) => {
			      	if(err) return next(err);
			      	if(!doc){
			      		return res.jsonp({status: 14});
				      }
				      res.jsonp({status:5, result: doc});
			      });
		      }else{
			      return next({status: 21, message: 'No privilege to delete', from:'base-router: remove'});
		      }
	      }else{
		      return next({status: 21, message: 'No privilege to delete', from:'base-router: remove'});
	      }
      }
    }
  }

  private count(type, options: RouterConfig){
  	return (req: Request, res: Response, next: NextFunction) => {
  		if(req.user){
  			if(options.otherActions[req.user.accType].r || req.user.accType == 'A'){
				  new BaseController(type).count(req.query, (err, count) => {
					  if(err) return next(err);
					  res.jsonp({status : 4, count: count});
				  })
			  }else{
  				return next({status : 22, message : 'No privilege to find', from:'base-router: count'});
			  }
		  }else{
  			if(options.guestActions.r){
				  new BaseController(type).count(req.query, (err, count) => {
					  if(err) return next(err);
					  res.jsonp({status : 4, count: count});
				  })
			  }else{
				  return next({status : 21, message : 'No privilege to find', from:'base-router: count'});
			  }
		  }
	  }
  }
	public commonSelect(select: Array<string>, canSelect: Array<string>){
		let x;
		if(select.length !== 0){
			x = select.filter((n) => {
				if(canSelect.indexOf(n) !== -1){
					return true;
				}else if(canSelect.indexOf(n.substring(1)) !== 1){
					return false;
				}
				return false;
			});
		}else{
			x = canSelect;
		}
		return x;
	}
}