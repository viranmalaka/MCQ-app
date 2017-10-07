import {RouterConfig} from "../routes/base-router";
const validator = require('validator');
/**
 * Created by malaka on 7/21/17.
 */
export const DISTRICT_LIST = [
	'Ampara',
	'Anuradhapura',
	'Badulla',
	'Batticaloa',
	'Colombo',
	'Galle',
	'Gampaha',
	'Hambantota',
	'Jaffna',
	'Kalutara',
	'Kandy',
	'Kegalle',
	'Kilinochchi',
	'Kurunegala',
	'Mannar',
	'Matale',
	'Matara',
	'Moneragala',
	'Mullaitivu',
	'Nuwara',
	'Polonnaruwa',
	'Puttalam',
	'Ratnapura',
	'Trincomalee',
	'Vavuniya',];

export class SchoolController{

	public static rules = {
		name : [
			{fun: 'isEmpty', expected: false, msg: 'Name cannot be empty'},
			{fun: 'regex', inputs: /^[a-zA-Z.,/()\-' ]+$/, msg: 'Invalid name' }
		],
		district : [
			{fun: 'isEmpty', expected: false, msg: 'District cannot be empty'},
			{fun: 'isIn', inputs: DISTRICT_LIST, msg: 'Invalid District'}
		]
	};

	public static routerConfig: RouterConfig = {
		modelName: 'School',
		validationRules : SchoolController.rules,
		guestActions : {
			r : ['name', 'district'],
			count: true
		},
		otherActions : {
			S : {
				c: false,
				r: ['name', 'district'],
				d: false,
				count: true,
			},
			T : {
				c: false,
				r: ['name', 'district'],
				d: false,
				count: true,
			},
			D : {
				c: true,
				r: ['name', 'district'],
				u: ['name'],
				d: false,
				count: true,
			},
		}
	};

}
