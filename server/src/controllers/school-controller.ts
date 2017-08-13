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

}
