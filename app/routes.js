/* import { json } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/body-parser';
 */
//require expres
var express = require('express');
var path = require('path');
const sql = require('mssql');
var fs = require('fs');
//var navigator = new Navigator();
var results=[];

//create out router object
var router = express.Router();
//var results = [];
//export our router
module.exports = router;

//route our homepg
router.get('/', function(req,res){

    res.render('pages/');
    });

router.post('/', function(req, res){
    /* res.render('pages/'); */
    /* var location = req.body.data;
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
     */
           // res.send(Latitude + " and " + Longitude);
            res.render('pages/');
       // }
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
    res.render('pages/rsvp',{results:results});
});


router.post('/rsvp', function(req,res){

    if (req.body.firstName == null){}
    else{
        var fn = JSON.stringify(req.body.firstName).replace(/'/gi,"''");
        var ln = JSON.stringify(req.body.lastName).replace(/'/gi,"''");
        var en = JSON.stringify(req.body.extraName||"NA").replace(/'/gi,"''");
        var fd = JSON.stringify(req.body.food||"NA").replace(/'/gi,"''");
        var ex = JSON.stringify(req.body.extra||"NA").replace(/'/gi,"''");
        var em = JSON.stringify(req.body.email).replace(/'/gi,"''");
        var ht = JSON.stringify(req.body.hotel||"NA").replace(/'/gi,"''");
        var pn = JSON.stringify(req.body.Phone||"NA").replace(/'/gi,"''");
        var ra = req.body.roomAmount||0;
        var rm = req.body.rooms||0;
    
        /* fn = fn.replace(/'/gi,"''");
        ln =  ln.replace(/'/gi,"''");
         en =  en.replace(/'/gi,"''");
         fd =  fd.replace(/'/gi,"''"); 
         ex = ex.replace("I","''");*/
        
   // }
    }
        
    if (sql.close){
        try{
            var config = {
                user: 'cobonie',
                password: 'codyisabutthole',
                server: 'weddingwebsitedb.civzgj8bgpoz.us-east-2.rds.amazonaws.com', 
                database: 'WeddingDB'
              };


              
                var sqlQuery = `select firstname from WeddingDB.dbo.rsvp where
                 firstname = '` + fn + `' and 
                 lastname = '` + ln + `' and
                 email = '` + em + `'`;
        
                sql.connect(config, err => {
                    // ... error checks
                 
                    const request = new sql.Request()
                    request.stream = true // You can set streaming differently for each request
                    request.query(sqlQuery) // or request.execute(procedure)
                    request.on('row', row => {
                        results.push((row)); // Emitted for each row in a recordset
                    //  res.render('pages/cobonie2018',{images:images});
                    })
                    request.on('done',  recordset => {
                       // images = images.replace('undefined',"");
                        console.log(JSON.stringify(results[0]));
                     //   res.render('pages/rsvp', {results:results});
                       /// sql.close();
                        
                        if (results[0]){
                            if (req.body.update == "yes"){
                                results = [];
                                res.render('pages/rsvp', {results:results});
                                
                                var sqlQuery =`
                                UPDATE WeddingDB.dbo.RSVP
                                SET
                                FirstName = '` + fn + `',
                                LastName = '` + ln + `',
                                PlusOne = '` + en + `',
                                Email = '` + em + `',
                                FoodRestrictions = '` + fd + `',
                                Extra = '` + ex + `',
                                Hotel = '` + ht + `',
                                HotelAmount = '` + ra + `',
                                Rooms = '` + rm + `',
                                Phone = '` + pn + `',
                                Date = getDate()
                                WHERE 
                                FirstName = '` + fn + `' and
                                LastName = '` + ln + `' and
                                Email = '` + em + `'
                                `;
                                // create Request object
                                var request = new sql.Request();
                          
                                    request.query(sqlQuery).then(sql.close);
                               // })
                                
                            }else{
                                res.render('pages/rsvp', {results:results});
                                
                                results = [];
                                sql.close();
                                console.log("There!");
                            }
                            
                            
                        }else{
                            /* sql.connect(config, function (err) {
        
                                if (err) console.log(err); */
                                res.render('pages/rsvp', {results:results});
                                
                            console.log("Here!");
                            var sqlQuery = 'insert into WeddingDB.dbo.RSVP ("FirstName", "LastName","PlusOne", "Email", "FoodRestrictions", "Extra", "Hotel", "HotelAmount", "Rooms", "Phone",  "Date") values (\'' + fn + '\', \'' + ln + '\', \'' + en  + '\', \'' + em + '\', \'' + fd  + '\', \'' + ex + '\', \'' + ht  + '\', \'' + ra + '\', \'' + rm  + '\', \'' + pn + '\' , getDate())' ;
                            var request = new sql.Request();
                      
                                request.query(sqlQuery).then(sql.close);
                                  
                           // })
                            results = [];
                        }
                    })
                });
                
               
        
        }catch(err){
            console.log("Error:" + err);
        }
    }else{
        sql.close();
    }
    
  //  res.send(JSON.stringify(result));
    //res.render('pages/rsvp');
});
router.get('/cobonie2018', function(req,res){
    var images=[];
    var config = {
        user: 'cobonie',
        password: 'codyisabutthole',
        server: 'weddingwebsitedb.civzgj8bgpoz.us-east-2.rds.amazonaws.com', 
        database: 'WeddingDB'
      };
  
    
        var sqlQuery = 'select URL, ExpandedURL from WeddingDB.dbo.Photos';
      if (sql.close){
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

      }else{
        sql.close();
    }
       

});

router.get('/datageek', function(req,res){
    //watch the last video on getting data
    /* var config = {
        user: 'cobonie',
        password: 'codyisabutthole',
        server: 'weddingwebsitedb.civzgj8bgpoz.us-east-2.rds.amazonaws.com', 
        database: 'WeddingDB'
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

