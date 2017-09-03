import {BaseRouter, RouterConfig} from "./base-router";
import {Router} from "express";
import {School} from "../models/School";
import {SchoolController} from "../controllers/school-controller";
/**
 * Created by malaka on 7/21/17.
 */
export class SchoolRouter {
  private baseRouter: BaseRouter;

  private static routerConfig: RouterConfig = {
	  validationRules : SchoolController.rules,
	  guestActions : {
	  	r : ['name', 'district'],
		  count: true
	  },
	  otherActions : {
	  	S : {
	  		c: true,
	  		r: ['name', 'district'],
			  u: ['name'],
			  d: false,
			  count: true,
		  },
		  T : {
	  		c: true,
	  		r: ['name', 'district'],
			  u: ['name'],
			  d: false,
			  count: true,
		  },
		  D : {
	  		c: true,
	  		r: ['name', 'district'],
			  u: ['name'],
			  d: false,
			  count: true,
		  },

	  }
  };

  constructor(){
    this.baseRouter = new BaseRouter();
  }

  public create(): Router{
	  let router: Router = Router();

    return this.baseRouter.create(router, School, SchoolRouter.routerConfig);
  }
}