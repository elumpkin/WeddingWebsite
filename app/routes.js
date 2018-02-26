//require expres
var express = require('express');
var path = require('path');
const sql = require('mssql');
var fs = require('fs');
var results=[];
var guest = 'none';
var count = 0;

//create our router object
var router = express.Router();

//export our router
module.exports = router;


router.post('/notGuest', function(req,res){
    count = req.body.count;
    res.render('pages/', {guest: 'false', count:count});
    
})
router.get('/', function(req,res){
    
    res.render('pages/', {guest: guest, count:count});
    });

router.post('/', function(req, res){

    var guestResult =[];
    var fn = JSON.stringify(req.body.firstNameLogin).replace(/'/gi,"''").toUpperCase();
    var ln = JSON.stringify(req.body.lastNameLogin).replace(/'/gi,"''").toUpperCase();
    var password =JSON.stringify(req.body.password).replace(/'/gi,"''"); 


    if (sql.close){
        try{
            var config = {
                user: '',
                password: '',
                server: '', 
                database: ''
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
                    })
                    request.on('done',  recordset => {
                        console.log("guestResult " + JSON.stringify(guestResult[0]));
                       sql.close();
                    
                        if (guestResult[0]){
                                
                                guest = 'true';
                                   console.log("A Guest!");
                                    res.render('pages/', {guest: guest, count:count});

                        }
                        else{
                            guest = 'false';
                            sql.close();
                            console.log("Not a Guest!");
                            res.render('pages/', {guest:guest, count:count});
                        }
                    })
                });
        }catch(err){
            console.log("Error:" + err);
        }
    }else{
        sql.close();
        guest = guest;
        res.render('pages/', {guest:guest, count:count});
        
    }  
     });
  

  router.get('/hellotoyes', function(req,res){
    if (guest!= "none"){
        res.render('pages/hellotoyes', {guest:guest});
        
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
    });




router.get('/siteinfo', function(req,res){
    if (guest!= "none"){
        res.render('pages/siteinfo');        
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
        
    
        
    });

//route for our about page
router.get('/about', function(req,res){
    if (guest!= "none"){
        res.render('pages/about', {guest:guest});
    }else{
        res.render('pages/', {guest: guest, count:count});
    } 
});



router.get('/venue', function(req,res){
    if (guest!= "none"){
        res.render('pages/venue', {guest:guest} );
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
    
});
router.get('/registry', function(req,res){
    if (guest!= "none"){
        res.render('pages/registry',{guest:guest});
    }else{
        res.render('pages/', {guest: guest, count:count});
    }  
});

router.get('/aestetic', function(req,res){
    if (guest!= "none"){
        res.render('pages/aestetic',{guest:guest});
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
   
});

router.get('/games', function(req,res){
    if (guest!= "none"){
        res.render('pages/games');
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
});

router.get('/schedule', function(req,res){
    if (guest!= "none"){
        res.render('pages/schedule', {guest:guest});
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
    
});
router.get('/faq', function(req,res){
    if (guest!= "none"){
        res.render('pages/faq', {guest:guest});
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
    
});
router.get('/rsvp', function(req,res){


    if (guest!= "none"){
        res.render('pages/rsvp',{results:results, guest:guest});
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
   
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
        var at = req.body.attending||0;

    }
        
    if (sql.close){
        try{
            var config = {
                user: '',
                password: '',
                server: '', 
                database: ''
              };


              
                var sqlQuery = `select firstname from WeddingDB.dbo.rsvp where
                UPPER(firstname) = '` + fn + `' and 
                UPPER(lastname) = '` + ln + `' and
                UPPER(email) = '` + em + `'`;
        
                sql.connect(config, err => {
                 
                    const request = new sql.Request()
                    request.stream = true 
                    request.query(sqlQuery) 
                    request.on('row', row => {
                        results.push((row)); // Emitted for each row in a recordset
                    })
                    request.on('done',  recordset => {
                        console.log(JSON.stringify(results[0]));
                        
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
                                Attending = '` + at + `',
                                RSVP = 'yes',
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
                               res.render('pages/rsvp', {results:results, guest:"guest"});

                            }
                            else{
                                res.render('pages/rsvp', {results:results, guest:"guest"});
                                
                                results = [];
                                sql.close();
                                console.log("There!");
                            }
                            
                            
                        }else{
                     
                                res.render('pages/rsvp', {results:results, guest:"guest"});
                                
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
        res.render('pages/rsvp', {results:results, guest:"guest"});

    }
    
});
router.get('/cobonie2018', function(req,res){
    var images=[];
    var config = {
        user: '',
                password: '',
                server: '', 
                database: ''
      };
  
    
        var sqlQuery = 'select URL, ExpandedURL from WeddingDB.dbo.Photos';
      if (sql.close){
        sql.connect(config, err => {
         
            const request = new sql.Request()
            request.stream = true 
            request.query(sqlQuery) 
            request.on('row', row => {
               images.push((row)); // Emitted for each row in a recordset
            })
            request.on('done',  recordset => {                
                res.render('pages/cobonie2018',{images:images, guest:guest});
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
         user: '',
                password: '',
                server: '', 
                database: ''
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
    
    if (guest!= "none"){
        res.render('pages/datageek');
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
   

    
});

router.get('/vendorpage', function(req,res){
    if (guest!= "none"){
        res.render('pages/vendorpage');
    }else{
        res.render('pages/', {guest: guest, count:count});
    }
   
});

router.get('/contact', function(req,res){
    if (guest!= "none"){
        res.render('pages/contact');
   }else{
        res.render('pages/', {guest: guest, count:count});
    }
   
});
router.post('/contact', function(req, res){
res.send('Thanks for contacting us, ' +req.body.name +'! We will respond shortly')
});

