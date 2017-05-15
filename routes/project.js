/**
 * Created by jayam on 5/3/17.
 */
var mysql = require('./mysql');


getAllProjects = function(req, res){
  var query = "Select * from Project_2 as p inner join managers_1 as m on p.manager_id=m.mid"; // prepare query
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
    description: req.body.description,
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


getProject = function(req, res){
  var pid = req.body.pid;
  var query = 'select * from Project_2 where pid = "' + pid + '"'; // prepare query
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


updateProject = function(req, res) {
  var project = {
    pid: req.body.pid,
    title: req.body.title,
    description: req.body.description,
    creation_date: req.body.creation_date,
    dead_date: req.body.dead_date,
    manager_id: req.body.manager_id,
    status: req.body.manager_id
  };

  var query = "UPDATE Project_2 SET title='"+project.title
    + "', description = '" +project.description
    + "', creation_date = '" +project.creation_date
    + "', dead_date = '" +project.dead_date
    + "', manager_id = '" +project.manager_id
    + "', status = '" +project.status
    +"' where pid ='"+project.pid + "'";

  mysql.fetchQuery(query, function (err, rows) {
    if(err){
      console.log('Couldnt execute Query : '+ query);
      console.log(err);
      return;
    }
    console.log('Query Successfully executed : '+query);
    res.sendStatus(200);
  });
};



getProjectMonitoring = function(req, res){
  var pid = req.body.pid;
  var query = 'select * from Project_Monitoring where pid = "' + pid + '" order by event_date desc'; // prepare query
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


getProjectTags = function(req, res){
  var pid = req.body.pid;
  //select  b.tag_name from Project_Tags_Map_4 a, Tags_3 b where a.tid = b.tid and a.pid = 2
  var query = 'select b.tag_name from Project_Tags_Map_4 a, Tags_3 b where a.tid = b.tid and a.pid = "' + pid + '" ';
  mysql.fetchQuery(query, function (err, rows) {
    if(err){
      console.log('Couldnt execute Query : '+ query);
      console.log(err);
      return;
    }
    console.log('Query Successfully executed : '+query+' , Row count : '+rows.length);
    res.send(rows);
  });
};

exports.addProject = addProject;
exports.getAllProjects = getAllProjects;
exports.getProject = getProject;
exports.updateProject = updateProject;
exports.getProjectMonitoring = getProjectMonitoring;
exports.getProjectTags = getProjectTags;


