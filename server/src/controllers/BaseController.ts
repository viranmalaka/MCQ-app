import {IBase, IBaseModel} from "../models/BaseModel";
import {School} from "../models/School";

/**
 * Created by malaka on 7/21/17.
 */

export class BaseController{
  constructor(private type){
  }

  public add(data : IBase, next: Function){
    let val = this.modelValidator(data);
    if(val){
      next(val);
    }
    new this.type(data).save(next);
  }

  public find(query: any, sort: any, select:any, next : Function){
    this.type.find(query).sort(sort).select(select).exec(next);
  }

  public findById(id: any, next:Function){
    this.type.findById(id, next);
  }

  public editById(id: any, data: IBase, next: Function){
    let val = this.modelValidator(data);
    if(val){
      next(val);
    }
    this.type.findByIdAndUpdate(id, data, next);
  }

  public modelValidator(data: IBase): any{
    console.log('validator from base');
  }
}