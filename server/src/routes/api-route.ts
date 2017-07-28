import {Router} from "express";
import {SchoolRouter} from "./school-router";
import {UserRouter} from "./user-router";
/**
 * Created by malaka on 7/21/17.
 */

export class APIRoute {
  public static create(router: Router) {
    router.get('/', UserRouter._validateToken, (req, res, next) => {
      res.jsonp({api: 'welcome to api', user: req.user});
    });

    router.get('/test', APIRoute.middle, (req, res, next) => {
      res.jsonp({test: req['test']});
    });

    router.use('/school', new SchoolRouter().create(router));

    router.use('/user', new UserRouter().create(router));
  }

  public static middle(req, res, next){
    req.test = 'test value fucking tmasha';
    next();
  }
}