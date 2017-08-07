import {Router} from "express";
import {SchoolRouter} from "./school-router";
import {UserRouter} from "./user-router";
import {PaperRouter} from "./paper-router";
import {QuestionRouter} from "./question-router";
/**
 * Created by malaka on 7/21/17.
 */

export class APIRoute {
  public static create(router: Router) {
		router.use(UserRouter._validateToken);

	  router.use('/paper', new PaperRouter().create());
	  router.use('/school', new SchoolRouter().create());
		router.use('/question', new QuestionRouter().create());
	  router.use('/user', new UserRouter().create());

	  router.get('/test_link', (req, res) => {
	  	res.jsonp({status : 200, message: 'welcome to mcq-api-backend'});
	  })
  }
}