/**
 * Created by jayam on 5/3/17.
 */
var mysql = require('./mysql');


getAllProjects = function(req, res){
  var query = "Select * from Project_2 as p inner join Managers_1 as m on p.manager_id=m.mid"; // prepare query
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

getAllProjectTags = function(req, res){
    var pid = req.body.pid;
    //select  b.tag_name from Project_Tags_Map_4 a, Tags_3 b where a.tid = b.tid and a.pid = 2
    var query = 'select * from Tags_3 ';
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

getProjectTest =  function(req, res){
    var pid = req.body.pid;
    var query = 'select t.case_name, t.pid, t.test_id from Test_5 t where t.pid = "' + pid + '" ';
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

getProjectTestCount =  function(req, res){

    var query = 'select * from Test_5';
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

addProjectTest = function(req, res) {
    // extract project values from the request to save
    /*
     {
     "case_name" : "verify date field",
     "pid": 3
     }
     */
    var project = {
        case_name: req.body.case_name,
        pid: req.body.pid
    };

    // to get a string representation of the project, helpful for debugging
    projStr = JSON.stringify(project)
    console.log('Rece Proj : ' + projStr);

    var query = "insert into Test_5 SET ?"; // prepare query

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


removeProjectTest = function(req, res) {
    // extract project values from the request to save
  /*
   {
   "test_id" : 4
   }
   */
    var project = {
        test_id: req.body.test_id
    };

    // to get a string representation of the project, helpful for debugging
    projStr = JSON.stringify(project)
    console.log('Rece Proj : ' + projStr);

    var query = "DELETE from test_5 where ?"; // prepare query

    // use below fucntion to execute insert query
    mysql.putDataQuery(query, project, function (err, rows) {
        if(err){
            console.log('Couldnt execute Query : '+ query);
            console.log(err);
            return;
        }
        console.log('Query Successfully executed : '+query);
        res.sendStatus(200); // send back the projects
    });
};

getContributor = function(req, res){
  /*
   {
   "pid" : 4
   }
   */
    var pid = req.body.pid;
    var query = 'select m.managerName , m.mid from Project_Contributors c inner join Managers_1 m on c.mid=m.mid  where c.pid = "' + pid + '" ';
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

getContributorCount = function(req, res){
    console.log("here");
    var pid = req.body.pid;
    var query = 'select * from Project_Contributors ';
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

addContributor = function(req, res) {
    // extract project values from the request to save
  /*
   {
   "mid" : 1,
   "pid": 3,
   "date_added" : "2017-05-17"
   }
   */
    var project = {
        mid: req.body.mid,
        pid: req.body.pid,
        date_added : req.body.date_added
    };

    // to get a string representation of the project, helpful for debugging
    projStr = JSON.stringify(project)
    console.log('Rece Proj : ' + projStr);

    var query = "insert into Project_Contributors SET ?"; // prepare query

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


getAllProjectsForlist = function(req, res){
    var query = "Select p.pid,p.title,p.description,p.creation_date,p.dead_date,p.url,m.ManagerName,test.case_name,"
    +"pm.event,pm.event_date,tags.tag_name "
    +"from Project_2 as p inner join Managers_1 as m on p.manager_id=m.mid "
        +"inner join project_contributors as pc on p.pid= pc.pid "
        +"inner join test_5 as test on test.pid=p.pid "
        +"inner join project_monitoring as pm on p.pid= pm.pid "
        +"inner join project_tags_map_4 as tm on tm.pid = p.pid "
        +"inner join tags_3 as tags on tags.tid = tm.tid group by p.pid "; // prepare query
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

exports.addProject = addProject;
exports.getAllProjects = getAllProjects;
exports.getProject = getProject;
exports.updateProject = updateProject;
exports.getProjectMonitoring = getProjectMonitoring;
exports.getProjectTags = getProjectTags;
exports.getProjectTest = getProjectTest;
exports.addProjectTest = addProjectTest;
exports.removeProjectTest = removeProjectTest;
exports.getContributor = getContributor;
exports.addContributor = addContributor;
exports.getAllProjectsForlist = getAllProjectsForlist
exports.getContributorCount = getContributorCount
exports.getProjectTestCount = getProjectTestCount
exports.getAllProjectTags = getAllProjectTags