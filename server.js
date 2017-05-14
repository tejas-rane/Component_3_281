/**
 * Created by jayam on 4/25/17.
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

app.get('/',routes.index);
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

app.get('/projects', projects.getAllProjects)
app.post('/projects', projects.addProject)

module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server Listening at port : '+ app.get('port'));
});