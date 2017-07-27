import {NextFunction, Request, Response, Router} from "express";
import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as jwt from "jsonwebtoken";
import {UserController} from "../controllers/user-controller";
import {User} from "../models/User";

/**
 * Created by MalakaD on 7/26/2017.
 */

export class UserRouter {

  public create(router: Router): Router {
    // router.use(this.login(router));
    router.post('/signup',
      UserRouter._passportLocal,
      UserRouter._generateToken,
      UserRouter.signup);

    return router;
  }

  public static signup(req: Request, res: Response, next: NextFunction) {
    console.log('here');
    new UserController(User).createUser(req.body, (user) => {
      console.log(user);
      req.login(user, (err) => {              // after signup automatic login
        if (err) next(err);
        console.log(user);
        this._generateToken(req, res, () => {     // generate token
          res.json({
            user: {
              acc_id: user.acc_id,
              username: user.username,
              email: user.email,
              acc_type: user.acc_type
            },
            token: req['token'],
            status: 200
          });
        });
      });

    });
  }

  public static _passportLocal(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', {        // passport auth
      session: false
    })(req, res, next);
  }


  public static _generateToken(req: Request, res: Response, next: NextFunction) {
    console.log('generate token');
    req['token'] = jwt.sign({
      id: req['user']['id']
    }, 'secret', {
      expiresIn: '10h'
    });
    next();
  }

  public static initPassport() {
    passport.use(new LocalStrategy.Strategy((username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        if (!user) {
          return done(null, false, {message: 'Unknown user'});
        }
        UserController.comparePassword(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          } else {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Invalid Password'});
            }
          }
        });
      });
    }));

    passport.serializeUser(function (user, done) {
      done(null, user['id']);
    });

    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });
  }
}