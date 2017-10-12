import {IBase} from "../models/BaseModel";
const validator = require('validator');

/**
 * Created by malaka on 7/21/17.
 */

export class BaseController {
	constructor(private type) {
	}

	public add(data: IBase, rules, next: Function) {
		let val = this.modelValidator(data, rules);
		if (val) {
			return next({status: 16, message: val, from: 'BaseController: add'});
		}
		return new this.type(data).save(next);
	}

	public find(query: any, sort: any, select: any, distinctField: string, popFields, next: Function) {
		if (distinctField === '') {
			this.type.find(query).sort(sort).select(select).populate(popFields).exec(next);
		} else {
			this.type.find(query).distinct(distinctField).exec(next);
		}
	}

	public findById(id: any, select: any, popField: string, next: Function) {
		this.type.findById(id, select).populate(popField).exec(next);
	}

	// full object will be validated.
	public editById(id: any, data: IBase, rules: any, allowedFields: Array<string>, next: Function) {
		Object.keys(data).forEach(key => {
			if(allowedFields.length > 0 && allowedFields.indexOf(key) < 0) {
				delete data[key];
			}
		});
		let val = this.modelValidator(data, rules);
		if (val) {
			return next({status: 16, message: val, from: 'BaseController: editById'});
		}
		this.type.findByIdAndUpdate(id, data, {'new': true}, next);
	}

	// partial of object will be validate and update.
	public partiallyEdit(id: string, data: any, rules:any, allowedFields: Array<string>, next: Function) {
		this.type.findById(id, (err, doc) => {
			if (err) next(err);
			if (doc) {
				let active = [];
				Object.keys(data).forEach((key) => {
					if(allowedFields.indexOf(key) >= 0) {
						active.push(key);
					}
				});
				let val = this.modelValidator(data, rules, active);
				if (!val) {
					(active).forEach(x => {
						if (data[x]) {
							doc[x] = data[x];
						}
					});
					doc.save(next);
				} else {
					return next({status: 16, message: val, from: 'BaseController: edit'});
				}
			} else {
				return next({status: 404, message: 'No such object'});
			}
		})
	}

	public remove(id: string, next: Function) {
		this.type.findByIdAndRemove(id, next);
	}

	public modelValidator(data: IBase, rules, fields?: Array<string>): any {
		// Local custom validators
		validator['regex'] = (str: string, regex: RegExp) => {
			return regex.test(str);
		};

		let errorObj = null;
		let valFunction = (key) => {
			rules[key].forEach((valRule) => {
				if (valRule.expected == undefined)
					valRule.expected = true;
				if (validator[valRule.fun](data[key] + '', valRule.inputs) !== valRule.expected) {
					if (!errorObj) errorObj = {};
					if (!errorObj[key]) errorObj[key] = {};
					errorObj[key]['value'] = data[key];
					if (errorObj[key]['message']) {
						errorObj[key]['message'].push(valRule['msg']);
					} else {
						errorObj[key]['message'] = [valRule['msg']];
					}
				}
			});
		};

		Object.keys(rules).forEach((key) => {
			// if(fields){
			// 	if(fields.length > 0 && fields.indexOf(key) >= 0){
			// 		valFunction(key);
			// 	} else {
			// 		valFunction(key);
			// 	}
			// }else{
			// 	valFunction(key);
			// }
			if(fields && fields.length > 0) {
				if(fields.indexOf(key) >= 0) {
					valFunction(key);
				}
			} else {
				valFunction(key);
			}
		});
		return errorObj;
	}

	public count(query: any, next: Function) {
		this.type.count(query, next);
	}

}