import {Router} from "express";
/**
 * Created by MalakaD on 7/26/2017.
 */

export class UserRouter{

	public create(router: Router): Router{
		router.use(this.login(router));

		return router;
	}

	private login(r: Router) : Router{
		// r.post() //TODO
		return r;
	}

}