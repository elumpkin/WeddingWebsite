//require expres
var express = require('express');
var path = require('path');

//create out router object
var utilities = express.Router();

//export our router
module.exports = utilities;
utilities.get('/utilities/images', function(req,res){

 // alert("images working");
 // return "HI!"
  res.render('pages/imageDownloader');
});
/* 
function getImages(){
    
    
    /* //exports.getImages = function(req, res) {
      var config = {
        user: 'elumpkin',
        password: 'Daffodil45',
        server: 'weddingwebsitedb.cje22lrusgxc.us-east-2.rds.amazonaws.com', 
        database: 'WeddingDB' 
      };
      
      var sqlQuery = 'select URL from WeddingDB.dbo.Photos';
    
    var images =  sql.connect(config, err => {
       new sql.Request().query(sqlQuery, (err, recordset) => {
    
        return recordset;
    }) 
    
    }); 
    alert("images working");
    return "HI!"
    }

    getImages(); */