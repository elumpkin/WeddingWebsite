///import { parse } from 'querystring';
//import { json } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/body-parser';

/* import { json } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/body-parser';
 */
//require expres
var express = require('express');
var path = require('path');
const sql = require('mssql');
var fs = require('fs');
//var navigator = new Navigator();
var results=[];
var guest = 'false';


//create out router object
var router = express.Router();
//var results = [];
//export our router
module.exports = router;

//route our homepg
router.get('/', function(req,res){
    

    res.render('pages/', {guest: guest});
    });

router.post('/', function(req, res){

    var guestResult =[];
    var fn = JSON.stringify(req.body.firstNameLogin).replace(/'/gi,"''").toUpperCase();
    var ln = JSON.stringify(req.body.lastNameLogin).replace(/'/gi,"''").toUpperCase();
    var password =JSON.stringify(req.body.password).replace(/'/gi,"''"); 


    if (sql.close){
        try{
            var config = {
                user: 'cobonie',
                password: 'codyisabutthole',
                server: 'weddingwebsitedb.civzgj8bgpoz.us-east-2.rds.amazonaws.com', 
                database: 'WeddingDB'
              };


              
                var sqlQuery = `select firstname from WeddingDB.dbo.rsvp where
                UPPER(firstname) = '` + fn + `' and 
                UPPER(lastname) = '` + ln + `' and 
                Password = '` + password + `'`;
        
                sql.connect(config, err => {
                    // ... error checks
                 
                    const request = new sql.Request()
                    request.stream = true // You can set streaming differently for each request
                    request.query(sqlQuery) // or request.execute(procedure)
                    request.on('row', row => {
                        guestResult.push((row)); // Emitted for each row in a recordset
                    //  res.render('pages/cobonie2018',{images:images});
                    })
                    request.on('done',  recordset => {
                       // images = images.replace('undefined',"");
                        console.log("guestResult " + JSON.stringify(guestResult[0]));
                     //   res.render('pages/rsvp', {results:results});
                       sql.close();
                    
                        if (guestResult[0]){
                                
                                guest = 'true';
                                   /// request.query(sqlQuery).then(sql.close);
                                   console.log("A Guest!");
                                    res.render('pages/', {guest: guest});

                        }
                        else{
                            guest = 'false';
                            sql.close();
                            console.log("Not a Guest!");
                            res.render('pages/', {guest:guest});
                        }
                    })
                });
        }catch(err){
            console.log("Error:" + err);
        }
    }else{
        sql.close();
        res.render('pages/', {guest:guest});
        
    }  
   // res.render('pages/');
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
        var fn = JSON.stringify(req.body.firstName).replace(/'/gi,"''").toUpperCase();
        var ln = JSON.stringify(req.body.lastName).replace(/'/gi,"''").toUpperCase();
        var en = JSON.stringify(req.body.extraName||"NA").replace(/'/gi,"''");
        var fd = JSON.stringify(req.body.food||"NA").replace(/'/gi,"''");
        var ex = JSON.stringify(req.body.extra||"NA").replace(/'/gi,"''");
        var em = JSON.stringify(req.body.email).replace(/'/gi,"''").toUpperCase();
        var ht = JSON.stringify(req.body.hotel||"NA").replace(/'/gi,"''");
        var pn = JSON.stringify(req.body.Phone||"NA").replace(/'/gi,"''");
        var ra = req.body.roomAmount||0;
        var rm = req.body.rooms||0;
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
                UPPER(firstname) = '` + fn + `' and 
                UPPER(lastname) = '` + ln + `' and
                UPPER(email) = '` + em + `'`;
        
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
                                UPPER(FirstName) = '` + fn + `' and
                                UPPER(LastName) = '` + ln + `' and
                                UPPER(Email) = '` + em + `'
                                `;
                                // create Request object
                                var request = new sql.Request();
                          
                                    request.query(sqlQuery).then(sql.close);
                               // })
                                
                            }
                            else{
                                res.render('pages/rsvp', {results:results});
                                
                                results = [];
                                sql.close();
                                console.log("There!");
                            }
                            
                            
                        }else{
                     
                                res.render('pages/rsvp', {results:results});
                                
                            console.log("Here!");
                            var sqlQuery = 
                            `UPDATE WeddingDB.dbo.RSVP
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
                            UPPER(FirstName) = '` + fn + `' and
                            UPPER(LastName) = '` + ln + `'
                            ` 
                            var request = new sql.Request();
                      
                                request.query(sqlQuery).then(sql.close);
                                  
                   
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

