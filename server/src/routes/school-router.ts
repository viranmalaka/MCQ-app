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
	  	r : ['name', 'district']
	  },
	  otherActions : {
	  	S : {
	  		c: true,
	  		r: ['name', 'district'],
			  u: ['name'],
			  d: false,
		  },
		  T : {
	  		c: true,
	  		r: ['name', 'district'],
			  u: ['name'],
			  d: false,
		  },
		  D : {
	  		c: true,
	  		r: ['name', 'district'],
			  u: ['name'],
			  d: false,
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