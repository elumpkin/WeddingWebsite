var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app =  express();
var port = 8090;
const sql = require('mssql')
var bodyParser = require('body-parser');
//var materialize = require('materialize-css');




//use ejs and express Layout
app.set('view engine', 'ejs');
app.use(expressLayouts);

//use body parser
app.use(bodyParser.urlencoded());

//route our app
var router = require('./app/routes');
var utilities = require('./app/app')
app.use('/',router);
app.use('/',utilities);
//app.get("/home",(req,res)=>{ res.render("home.ejs", {data : data})});

//set static files
app.use(express.static(__dirname + '/public'));

//start the server
app.listen(port, function(){
    console.log('app started');
});

