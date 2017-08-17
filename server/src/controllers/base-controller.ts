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

	public find(query: any, sort: any, select: any, next: Function) {
		this.type.find(query).sort(sort).select(select).exec(next);
	}

	public findById(id: any, select: any, next: Function) {
		this.type.findById(id, select, next);
	}

	public editById(id: any, data: IBase, rules, next: Function) {
		let val = this.modelValidator(data, rules);
		if (val) {
			return next({status: 16, message: val, from: 'BaseController: editById'});
		}
		this.type.findByIdAndUpdate(id, data, next);
	}

	public edit(id: string, data: any, rules:any, allowedFields: Array<string>, next: Function) {
		this.type.findById(id, (err, doc) => {
			if (err) next(err);
			if (doc) {
				let active = allowedFields.length > 0 ? allowedFields : Object.keys(data);
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
				let x = validator[valRule.fun](data[key] + '', valRule.inputs);
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
			if(fields.length > 0){
				if(fields.indexOf(key) >= 0){
					valFunction(key);
				}
			}else{
				valFunction(key);
			}
		});
		return errorObj;
	}

	public count(query: any, next: Function) {
		this.type.count(query, next);
	}

}