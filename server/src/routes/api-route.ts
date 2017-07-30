import {Router} from "express";
import {SchoolRouter} from "./school-router";
import {UserRouter} from "./user-router";
import {PaperRouter} from "./paper-router";
/**
 * Created by malaka on 7/21/17.
 */

export class APIRoute {
  public static create(router: Router) {


	  router.use('/paper', new PaperRouter().create(router));
	  router.use('/school', new SchoolRouter().create(router));
	  router.use('/user', new UserRouter().create(router));

	  router.get('/', UserRouter._validateToken, (req, res, next) => {
		  res.jsonp({api: 'welcome to api', user: req.user});
	  });
  }

}