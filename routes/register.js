/**
 * Created by tejas on 5/4/2017.
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
    user:'root',  // this will be your own db user name, mine is 'root'
    password:'admin', // your given passwrod for the db user name , my pwd is 'root'
    database : 'cmpe281',  // enter the database name that you want to use
});


login = function(req, res) {
    // extract project values from the request to save
    var login = {
        email: req.body.email,
        password: req.body.password
    };
    loginStr = JSON.stringify(login)
    console.log('log in details : ' + loginStr);
    connection.connect(function (err) {
        if(err){
            console.log('Could not Connect to DB');
            console.log(err);
            return;
        }
        var query = 'select * from Managers_1 WHERE  email = "' + login.email + '" and password = "'+ login.password +'"'; // prepare query
        //var query = "select * FROM managers_1 in ?"; // prepare query
        connection.query(query, function (err, rows) {
            if(err){
                console.log('Could not execute Query : '+ query);
                console.log(err);
                return;
            }
            console.log('Query Successfully executed : '+query);
            if(rows.length === 1){
                res.sendStatus(200);
            }
           else{
                res.sendStatus(403); // send back error code
            }
        });
        connection.end();
    });
};
registerUser = function(req, res) {

    var details = {
        email: req.body.email,
        password: req.body.password
    };
    detailsStr = JSON.stringify(details)
    console.log('log in details : ' + detailsStr);
    connection.connect(function (err) {
        if(err){
            console.log('Could not Connect to DB');
            console.log(err);
            return;
        }
        var query = "INSERT into Managers_1  set ?"; // prepare query
        connection.query(query, details, function (err, rows) {
            if(err){
                console.log('Could not execute Query : '+ query);
                console.log(err);
                return;
            }
            console.log('Query Successfully executed : '+query);
            res.sendStatus(201);
        });
        connection.end();
    });
};
getAllUsers = function(req, res){
    // connect to database
    connection.connect(function (err) {
        if(err){
            console.log('Couldnt Connect to DB');
            console.log(err);
            return;
        }
        var query = "Select * from managers_1"; // prepare query
        // use below fucntion to execute query
        connection.query(query, function (err, rows) {
            if(err){
                console.log('Couldnt execute Query : '+ query);
                console.log(err);
                return;
            }
            console.log('Query Successfully executed : '+query+' , Row count : '+rows.length);
            res.send(rows); // send back the users
        });
    });
};

exports.registerUser =registerUser;
exports.login = login;
exports.getAllUsers = getAllUsers;


