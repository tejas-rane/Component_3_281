/**
 * Created by jayam on 4/25/17
 */
var express = require('express');
var routes = require('./routes/index');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');                 //new
var projects = require('./routes/project');


var app = express();
app.set('port',3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'src')));//new



app.get('/index',routes.index);
app.get('/',routes.login);
// app.get('/projectDetails/:pid',routes.projectDetail);

app.set('views',__dirname + '/views');
app.set('view engine','ejs');

app.get('/projects', projects.getAllProjects)
app.post('/projects', projects.addProject)
app.post('/getProject', projects.getProject)
app.post('/getProjectMonitoring', projects.getProjectMonitoring)
app.post('/getProjectTags', projects.getProjectTags)
app.post('/updateProject', projects.updateProject)
// test cases
app.post('/getProjectTests', projects.getProjectTest)
app.post('/addProjectTest', projects.addProjectTest)
app.post('/removeProjectTest', projects.removeProjectTest)

//contributors
app.post('/getProjectContributors', projects.getContributor)
app.post('/addProjectContributors', projects.addContributor)



module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server Listening at port : '+ app.get('port'));
});
