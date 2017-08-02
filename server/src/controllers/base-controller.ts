import {IBase, IBaseModel} from "../models/BaseModel";
const validator = require('validator');

/**
 * Created by malaka on 7/21/17.
 */

export class BaseController{
  constructor(private type){
  }

  public add(data : IBase, rules,next: Function){
    let val = this.modelValidator(data, rules);
    if(val){
    	// val.message = 'Validation Error'
      return next(val);
    }

    return new this.type(data).save(next);
  }

  public find(query: any, sort: any, select:any, next : Function) {
    this.type.find(query).sort(sort).select(select).exec(next);
  }

  public findById(id: any, select: any, next:Function){
    this.type.findById(id, select, next);
  }

  public editById(id: any, data: IBase, next: Function){
    let val = {};
    if(val){
      next(val);
    }
    this.type.findByIdAndUpdate(id, data, next);
  }

  public remove(id: string, next: Function){
    this.type.findByIdAndRemove(id, next);
  }

  public modelValidator(data: IBase, rules): any{
	  let errorObj = null;
	  Object.keys(rules).forEach(function (key) {
	  	rules[key].forEach((valRule) => {
	  		if(!validator[valRule.fun](data[key])){
	  			if(!errorObj) errorObj = {};
				  if(!errorObj[key]) errorObj[key] = {};
				  errorObj[key]['value'] = data[key];
				  if(errorObj[key]['message']){
					  errorObj[key]['message'].push(valRule['msg']);
				  }else{
				  	errorObj[key]['message'] = [valRule['msg']];
				  }
			  }
		  });
	  });
	  return errorObj;
  }

  public count(query: any, next: Function) {
    this.type.count(query, next);
  }

}