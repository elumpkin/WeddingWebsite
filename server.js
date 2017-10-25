



var express = require('express');
var app =  express();
var port = 8090;

//route our app
var router = require('./app/routes');
app.use('/',router);

//set static files
app.use(express.static(__dirname + '/public'));

//start the server
app.listen(port, function(){
    console.log('app started');
});

