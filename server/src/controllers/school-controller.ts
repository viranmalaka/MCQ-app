const validator = require('validator');
/**
 * Created by malaka on 7/21/17.
 */

export class SchoolController{

	public static rules = {
		name : [
			{fun: 'isAlpha', msg: 'Name should be alpha'},
			{fun: 'isLowercase', msg: 'Name should be lower case'}
		],
		district : [
			{fun: 'isAlpha', msg: 'Name should be alpha'},
			{fun: 'isLowercase', msg: 'Name should be lower case'}
		]
	};

}