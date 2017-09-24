/**
 * Created by malaka on 7/29/17.
 */

import {BaseRouter, RouterConfig} from "./base-router";
import {Router} from "express";
import {Paper} from "../models/Paper";
import {PaperController} from "../controllers/paper-controller";

export class PaperRouter {
  private baseRouter: BaseRouter;
	// ['alias', 'name', 'medium', 'subject',	'timeLimit', 'unitMark', 'questions',
	// 'finished',	'choicesCount', 'questionMix', 'addedBy',	'description', 'isPastPaper']
	private static routerConfig: RouterConfig = {
		modelName: 'Paper',
    validationRules : PaperController.rules,
    guestActions : {
      r : ['alias', 'name', 'medium', 'subject',	'timeLimit', 'questions',
	          'finished',	'choicesCount', 'questionMix', 'description', 'isPastPaper']
    },
    otherActions : {
      S : {
        c: false,
        r: ['alias', 'name', 'medium', 'subject',	'timeLimit', 'unitMark', 'questions',
	          'finished',	'choicesCount', 'questionMix', 'addedBy',	'description', 'isPastPaper'],
        u: [],
        d: false,
      },
      T : {
        c: true,
        r: ['alias', 'name', 'medium', 'subject',	'timeLimit', 'unitMark', 'questions',
	        'finished',	'choicesCount', 'questionMix', 'addedBy',	'description', 'isPastPaper'],
        u: [],
        d: true,
      },
      D : {
        c: true,
        r: ['alias', 'name', 'medium', 'subject',	'timeLimit', 'unitMark', 'questions',
	        'finished',	'choicesCount', 'questionMix', 'addedBy',	'description', 'isPastPaper'],
        u: [],
        d: true,
      },
    },
		ownerActions : {
    	c: true,
			r: ['alias', 'name', 'medium', 'subject',	'timeLimit', 'unitMark', 'questions',
			    'finished',	'choicesCount', 'questionMix', 'addedBy',	'description', 'isPastPaper'],
			u: ['alias', 'name', 'medium', 'subject',	'timeLimit', 'unitMark', 'questions',
			   'finished',	'choicesCount', 'questionMix', 'addedBy',	'description', 'isPastPaper'],
			d : true,
		},
		ownerShip : 'addedBy',
  };

  constructor(){
    this.baseRouter = new BaseRouter();
  }

  public create(): Router{
    let router : Router = Router();

    router.get('/test', function (req, res) {
      res.send("in paper");
    });

    return this.baseRouter.create(router, Paper, PaperRouter.routerConfig);

  }
}