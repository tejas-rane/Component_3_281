/**
 * Created by jayam on 5/3/17.
 */
var mysql = require('./mysql');


getAllProjects = function(req, res){
  var query = "Select * from Project_2"; // prepare query
  mysql.fetchQuery(query, function (err, rows) {
    if(err){
      console.log('Couldnt execute Query : '+ query);
      console.log(err);
      return;
    }
    console.log('Query Successfully executed : '+query+' , Row count : '+rows.length);
    res.send(rows); // send back the projects
  });
};




/*
*   Smaple POST Request for adding project
*   {
     "title" : "valtitle",
     "description": "This is aFirst  Project ",
     "creation_date": "2017-05-03",
     "dead_date": "2027-05-03",
     "manager_id": 1,
     "status": "A",
     "archive": "N"
   }
* */
addProject = function(req, res) {
  // extract project values from the request to save
  var project = {
    title: req.body.title,
    description: req.body.desc,
    creation_date: req.body.creation_date,
    dead_date: req.body.dead_date,
    manager_id: req.body.manager_id,
    status: req.body.manager_id
  };

  // to get a string representation of the project, helpful for debugging
  projStr = JSON.stringify(project)
  console.log('Rece Proj : ' + projStr);

  var query = "insert into Project_2 SET ?"; // prepare query

  // use below fucntion to execute insert query
  mysql.putDataQuery(query, project, function (err, rows) {
    if(err){
      console.log('Couldnt execute Query : '+ query);
      console.log(err);
      return;
    }
    console.log('Query Successfully executed : '+query);
    res.sendStatus(201); // send back the projects
  });
};

exports.addProject = addProject;
exports.getAllProjects = getAllProjects;