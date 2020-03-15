var express = require("express");
var app = express();
const path = require('path');
const url = require('url');
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://catherine:jinx@localhost:5432/collection";
const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended : true}));

//endpoints
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
// app.post("/logIn", logIn);
app.get("/seeCollection", seeCollection);

// app.get("/seeCollection", (req, res) => {
   
//     const collection = req.query.collection;
//     const result = seeCollection(collection);
//     const params = {collection: collection, result: result};

//     res.render("showCollection", params);

// });



app.listen(app.get("port"), function() {
    console.log("Now listening on port: ", app.get("port"));
});

//functions


function seeCollection(req, res) {
    
    const collection = req.query.collection;
    

    seeCollectionFromDb(collection, function(error, result) {
        console.log("Back from the seeCollectionFromDb function with result: ", result);

        if (error || result == null) {
            res.status(500).json({success: false, data: error});
        }else {
            res.json(result); 
        }
           
    });
    const result = JSON.stringify(result);
    const params = {collection: collection, result: result};
    console.log("Retrieving collection ", collection);
    res.render("showCollection", params);  
}

function seeCollectionFromDb(collection, callback) {
    console.log("GetCollectionFromDB called with collection: ", collection);
    
    var sql = "SELECT item_name, item_description FROM collections WHERE collection_name = $1::text";
    let params = [collection];

    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });
}

// TODO build function to log-in user and return user id
function logIn() {

};