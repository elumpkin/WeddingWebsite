var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app =  express();
var port = 8090;
const sql = require('mssql')
var bodyParser = require('body-parser');
//var helmet = require('helmet');

//var materialize = require('materialize-css');
//app.use(helmet());

//var catalog = require('./routes/catalog'); //Import routes for "catalog" area of site
//var compression = require('compression');
//app.use(compression()); //Compress all routes

//app.use(express.static(path.join(__dirname, 'public')));
/* 
app.use('/', index);
app.use('/users', users);
app.use('/catalog', catalog);  // Add catalog routes to middleware chain.

 */
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

