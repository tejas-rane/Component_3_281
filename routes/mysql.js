/**
 * Created by jayam on 5/13/17.
 */
var mysql = require('mysql');

function getConnection (){
  var connection = mysql.createConnection({
    user:'root',  // this will be your own db user name, mine is 'root'
    password:'admin', // your given passwrod for the db user name , my pwd is 'root'
    database : 'cmpe281',  // enter the database name that you want to use
  });

  return connection;
}

function fetchQuery(sqlQuery, callback)
{
  console.log("\nSQL Query::"+sqlQuery);
  var connection=getConnection();
  connection.query(sqlQuery, function(err, rows, fields) {
    if(err){
      console.log("ERROR: " + err.message);
    }
    else
    {	// return err or result
      console.log("DB Results:"+rows);
      callback(err, rows);
    }
  });
  console.log("\nConnection closed..");
  connection.end();
}

function putDataQuery(sqlQuery, data, callback)
{
  console.log("\nSQL Query::"+sqlQuery);
  var connection=getConnection();
  connection.query(sqlQuery, data, function (err, rows) {
    if(err){
      console.log('Couldnt execute Query : '+ sqlQuery);
      console.log(err);
    }
    callback(err, rows);
  });

  console.log("\nConnection closed..");
  connection.end();
}

exports.fetchQuery = fetchQuery;
exports.putDataQuery = putDataQuery;

