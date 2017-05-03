/**
 * Created by jayam on 5/3/17.
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
  user:'root',  // this will be your own db user name, mine is 'root'
  password:'root', // your given passwrod for the db user name , my pwd is 'root'
  database : '281_proj',  // enter the database name that you want to use
});

getAllProjects = function(req, res){

  // connect to database
  connection.connect(function (err) {
    if(err){
      console.log('Couldnt Connect to DB');
      console.log(err);
      return;
    }
    var query = "Select * from Project_2"; // prepare query

    // use below fucntion to execute query
    connection.query(query, function (err, rows) {
      if(err){

        console.log('Couldnt execute Query : '+ query);
        console.log(err);
        return;
      }
      console.log('Query Successfully executed : '+query+' , Row count : '+rows.length);
      res.send(rows); // send back the projects
    });
  });
};

addProject = function(req, res) {
  console.log('title : ' + req.body.title);
  // extract project values from the request to save
  var project = {
    title: req.body.title,
    desc: req.body.desc
  };

  // to get a string representation of the project, helpful for debugging
  projStr = JSON.stringify(project)
  console.log('Rece Proj : ' + projStr);

  // 200 to send OK , 201 to send Created
  res.send(200);
};

exports.addProject = addProject;
exports.getAllProjects = getAllProjects;