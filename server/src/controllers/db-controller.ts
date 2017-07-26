/**
 * Created by malaka on 7/21/17.
 */
import mongoose = require("mongoose");
import {Connection} from "mongoose";

export class DBController {
  private static instance: DBController;
  private dbConnection : Connection;

  private constructor(){
    mongoose.Promise = global.Promise;
    this.dbConnection = mongoose.createConnection('mongodb://localhost/testDB');
  }

  public static getInstance(){
    if(DBController.instance == null){
      DBController.instance = new DBController();
    }
    return DBController.instance;
  }

  public getConnection(){
    return this.dbConnection;
  }
}
