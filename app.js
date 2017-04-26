/**
 * Created by jayam on 4/25/17.
 */
var express = require('express');
var routes = require('./routes/index');
var http = require('http');
var app = express();
app.set('port',3000);

app.get('/',routes.index);
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server Listening at port : '+ app.get('port'));
});