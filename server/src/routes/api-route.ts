import {Router} from "express";
import {SchoolRouter} from "./school-router";
import {UserRouter} from "./user-router";
import {PaperRouter} from "./paper-router";
import {Student} from "../models/User";
import {QuestionRouter} from "./question-router";
/**
 * Created by malaka on 7/21/17.
 */

export class APIRoute {
  public static create(router: Router) {

	  router.get('/', (req, res) => {
		  Student.find({}, (err, std)=>{
			  res.jsonp({api: 'welcome to api', user: std});
		  });
	  });
	  router.use('/paper', new PaperRouter().create());
	  router.use('/school', new SchoolRouter().create());
		router.use('/question', new QuestionRouter().create());
	  router.use('/user', new UserRouter().create());
  }

}