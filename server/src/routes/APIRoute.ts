import {Router} from "express";
import {SchoolRouter} from "./SchoolRouter";
import {ISchoolModel, School} from "../models/School";
import {BaseController} from "../controllers/BaseController";
import {SchoolController} from "../controllers/SchoolController";
/**
 * Created by malaka on 7/21/17.
 */

export class APIRoute {
  public static create(router: Router) {
    // router.use('/user', UserRoute.createUserRoute(router));
    // router.use('/test', TestRoute.createUserRoute(router));
    router.use('/school', new SchoolRouter().create(router));
  }
}