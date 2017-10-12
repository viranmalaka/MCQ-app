import {DBController} from "../controllers/db-controller";

let dataSets = {
	'school' : require('./school-data').schools,
};

DBController.getInstance().getConnection();
let count = 0;
console.log('arg : ' + process.argv[2]);
// console.log('data set: ' + dataSets[process.argv[2]]);
dataSets[process.argv[2]].forEach((val) => {
	val.save((e, s) => {
		if(e){
			console.log(e);
		} else {
			count += 1;
		}
	})
});