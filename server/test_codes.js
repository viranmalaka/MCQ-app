/**
 * Created by malaka on 8/12/17.
 */
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
this.dbConnection = mongoose.createConnection('mongodb://localhost/mcq-app');
