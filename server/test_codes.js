/**
 * Created by malaka on 8/12/17.
 */
var mongoose = require("mongoose");
var val = require('validator');

// mongoose.Promise = global.Promise;
// this.dbConnection = mongoose.createConnection('mongodb://localhost/mcq-app');
console.log(val.isLength('student', {min : 6, max: 20}));