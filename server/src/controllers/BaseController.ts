import {Base, IBase, IBaseModel} from "../models/BaseModel";
import {School} from "../models/School";

/**
 * Created by malaka on 7/21/17.
 */

export class BaseController{
  constructor(private type){
  }

  public add(data : IBaseModel){
    return new this.type(data);
  }

  public find(query: any, next : Function){
    this.type.find(query, next);
  }
}