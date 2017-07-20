/**
 * Created by malaka on 7/8/17.
 */
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import passport = require('passport')
// import {APIRoute} from "./routes/api";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //routers Error handling
    this.onError();

    //add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //use logger middlware
    this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //use cookie parker middleware middlware
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    //use override middlware
    this.app.use(methodOverride());

    //create database connection
    // DBController.getInstance().getConnection();

    //Passport init
    // this.app.use(passport.initialize());
    // this.app.use(passport.session());

    // UserController.initialize();
  }

  /**
   * Create router
   *
   * @class Server
   * @method api
   */
  public routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    APIRoute.create(router);

    //use router middleware
    this.app.use('/api', router);
  }

  public onError(){
    // error handler
    this.app.use(function (err: any, req: express.Request, res : express.Response, next : express.NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('dev') === 'development' ? err : {};

      console.log('\x1b[31m' +  err.message + "\n\t" + " from --> " + err['from']);

      res.status(err.status || 500).send({
        success : false,
        msg :'SERVER - ' + err.message
      });
    });
  }
}