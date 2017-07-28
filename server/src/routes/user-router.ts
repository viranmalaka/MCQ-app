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
    router.post('/signup', UserRouter.signup);

    router.post('/login', UserRouter._passportLocal, UserRouter._generateToken, UserRouter.login);

    return router;
  }

  public static signup(req: Request, res: Response, next: NextFunction) {
    new UserController(User).createUser(req.body, (user) => {
      req.login(user, (err) => {              // after signup automatic login
        if (err) next(err);
        console.log('req.user', req.user);
        UserRouter._generateToken(req, res, () => {     // generate token
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

  public static login(req: Request, res: Response, next: NextFunction) {
    res.json({                            // send the user with the token
      user: {
        acc_id: req.user.acc_id,
        username: req.user.username,
        email: req.user.email,
        acc_type: req.user.acc_type,
        profile_picture : req.user.profile_picture
      },
      token : req['token'],
      success : true
    });
  }

  // region middlewares
  public static _passportLocal(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', {        // passport auth
      session: false
    })(req, res, next);
  }

  public static _generateToken(req: Request, res: Response, next: NextFunction) {
    console.log('generate token');
    let x : object = {
      id: req['user']['id'],
    };
    req['token'] = jwt.sign(x, 'secret', {
      expiresIn: '10h'
    });
    next();
  }

  public static _validateToken(req, res, next) {
    if(!req.get('token')){
      next({message: 'no token in the request'});
    }else{
      let user = jwt.verify(req.get('token'), 'secret');
      User.findById(user['id'], function (err, doc) {
        console.log('set user');
        req.user = doc;
        next();
      })
    }
  }
  // endregion

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
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  }
}