//require expres
var express = require('express');
var path = require('path');
const sql = require('mssql');
var fs = require('fs');
//var navigator = new Navigator();

//create out router object
var router = express.Router();

//export our router
module.exports = router;

//route our homepg
router.get('/', function(req,res){

    res.render('pages/');
    });


router.post('/', function(req, res){
    /* res.render('pages/'); */
    var location = req.body.data;
    var Latitude = location.substring(0, location.indexOf(','));
    var Longitude = location.substring(location.indexOf(',') + 1);
     if (req.body.button = 'YES'){
        var config = {
            
          };
      
          sql.connect(config, function (err) {
            
                if (err) console.log(err);
                var sqlQuery = 'insert into WeddingDB.dbo.Locations("Latitude", "Longitude", "Date") values (\' ' + Latitude + '\', \'' + Longitude + '\', getDate())' ;
                // create Request object
                var request = new sql.Request();
          
                    request.query(sqlQuery).then(sql.close);
                           
                });
        
                //
    
           // res.send(Latitude + " and " + Longitude);
            res.render('pages/');
        }
     });
  

  router.get('/hellotoyes', function(req,res){
    
        res.render('pages/hellotoyes');
    });

router.get('/siteinfo', function(req,res){
    
        res.render('pages/siteinfo');
    
        
    });

//route for our about page
router.get('/about', function(req,res){
    var users =[
        {name: 'Ebonie', email:'ebonie.b.lumpkin@gmail.com'}
    ]

    res.render('pages/about', {users: users});
});



router.get('/venue', function(req,res){
    res.render('pages/venue');
});
router.get('/registry', function(req,res){
    res.render('pages/registry');
});

router.get('/aestetic', function(req,res){
    res.render('pages/aestetic');
});

router.get('/games', function(req,res){
    res.render('pages/games');
});

router.get('/schedule', function(req,res){
    res.render('pages/schedule');
});
router.get('/faq', function(req,res){
    res.render('pages/faq');
});
router.get('/rsvp', function(req,res){
    res.render('pages/rsvp');
});


router.post('/rsvp', function(req,res){

    if (req.body.firstName == null){}
    else{
        var fn = req.body.firstName;
        var ln =  req.body.lastName;
        var en =  req.body.extraName;
        var fd =  req.body.food;
        var ex = req.body.extraInfo;
    
        /* fn = fn.replace(/'/gi,"''");
        ln =  ln.replace(/'/gi,"''");
         en =  en.replace(/'/gi,"''");
         fd =  fd.replace(/'/gi,"''"); */
         ex = ex.replace("I","''");
        
   // }
    }
        
    
    
    var config = {
        
      };
  
      sql.connect(config, function (err) {
        
            if (err) console.log(err);
            var sqlQuery = 'insert into WeddingDB.dbo.RSVP ("FirstName", "LastName","PlusOne", "Email", "FoodRestrictions", "Extra", "Hotel", "Date") values (\'' + fn + '\', \'' + ln + '\', \'' + en  + '\', \'' + req.body.email + '\', \'' + fd  + '\', \'' + ex + '\', \'' + req.body.hotel + '\' , getDate())' ;
            // create Request object
            var request = new sql.Request();
      
                request.query(sqlQuery).then(sql.close);
                       
            });
    


    res.render('pages/rsvp');
});
router.get('/cobonie2018', function(req,res){
    var images=[];
    var config = {
      
      };
  
    
        var sqlQuery = 'select URL, ExpandedURL from WeddingDB.dbo.Photos';

        sql.connect(config, err => {
            // ... error checks
         
            const request = new sql.Request()
            request.stream = true // You can set streaming differently for each request
            request.query(sqlQuery) // or request.execute(procedure)
            request.on('row', row => {
               images.push((row)); // Emitted for each row in a recordset
            //   res.render('pages/cobonie2018',{images:images});
            })
            request.on('done',  recordset => {
               // images = images.replace('undefined',"");
                
                res.render('pages/cobonie2018',{images:images});
                sql.close();
            })
        });


});

router.get('/datageek', function(req,res){
    //watch the last video on getting data
    /* var config = {
      
      };


      var sqlQuery = 'insert into WeddingDB.dbo.Locations("Location", "Date") values ( \'working\', getdate())';
      sql.connect(config, err => {
      const request = new sql.Request()
      request.stream = true // You can set streaming differently for each request
      request.query(sqlQuery) // or request.execute(procedure)
      request.on('done', r => {
         // images = images.replace('undefined',"");
          
        
          sql.close();
      })
    }); */

    res.render('pages/datageek');
});

router.get('/vendorpage', function(req,res){
    res.render('pages/vendorpage');
});

router.get('/contact', function(req,res){
    res.render('pages/contact');
});
router.post('/contact', function(req, res){
res.send('Thanks for contacting us, ' +req.body.name +'! We will respond shortly')});

