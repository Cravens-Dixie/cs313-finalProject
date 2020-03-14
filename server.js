var express = require("express");
var app = express();

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://catherine:jinx@localhost:5432/collection";
const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));

//endpoints

app.get('/', (req, res) => res.render('pages/index'));
app.post("/logIn", logIn);
app.get("/seeCollection", seeCollection);




app.listen(app.get("port"), function() {
    console.log("Now listening on port: ", app.get("port"));
});

//functions

function seeCollection(req, res) {
    console.log("Working on request for the collection.");

    var collection = req.query.collection;
    console.log("Retrieving collection ", collection);

    seeCollectionFromDb(table, function(error, result) {
        console.log("Back from the seeCollectionFromDb function with result: ", result);
        
        if (error) {
            res.status(500).json({success: false, data: error});
        }else {
            res.json(result);
            //add table structure here to display result
        }
        
    });
    
}

function seeCollectionFromDb(collection, callback) {
    console.log("GetCollectionFromDB called with table: ", collection);
    

    var buildSql = "SELECT item_name, item_description FROM " + collection + ";";
    var sql = buildSql;
    //var params = [table];

    pool.query(sql, function(err, result) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows)
    });
}

// TODO build function to log-in user and return user id
function logIn() {

};