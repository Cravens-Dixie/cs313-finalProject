var express = require("express");
var app = express();
const path = require('path');
const url = require('url');
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://catherine:jinx@localhost:5432/collection";
const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));


app.use(express.urlencoded({ extended : true}));
app.use(express.json());

//endpoints
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));

app.get("/seeCollections", function(req, res){
//get all collections by collection_owner upon successful login
//need a owner
var owner = req.query.owner;
console.log("Getting all collections by owner:" + owner);

var results = {
    collections: [
        {collection_owner:owner, collection_name:"Squishmallows"},
        {collection_owner:owner, collection_name:"Puppy Pals"}
    ]
};

res.json(results);
});

app.get("/seeCollection", (req, res) => {
  //get a single collection by collection_name 
  console.log("Getting a collection by name:")
    const collection = req.query.collection;
    const result = seeCollection(collection);
    const params = {collection: collection, result: result};

    res.render("showCollection", params);

});

app.post("/logIn", function(req, res) {
    //validate a user and password
    console.log("Validating an owner with name and password ");

    res.json({success:true});
});

app.post("/newUser", function(req, res) {
    //Create a new user and password
    console.log("Creating a new owner");

    res.json({success:true});
});

app.post("/newCollection", function(req, res) {
    //create a new collection with collection_name, collection_owner, item_name, item_description, etc
    console.log("Creating a new collection");

    res.json({success:true});
});

app.post("/newItem", function(req, res) {
    //create a new item in a collection with collection_name, collection_owner, item_name, item_description, etc
    var name = req.body.name;
    var owner = "Dixie";//req.body.owner;
    var itemName = req.body.itemName;
    var itemDesc = req.body.itemDesc;
    var params = {name: name, owner: owner};
    //var params = {name: name, owner: owner, itemName: itemName, itemDesc: itemDesc};
    //console.log("Creating new collection item with name: " + name + 
   // ", owner: " + owner + ", item name: " + itemName + ", and item description: " + itemDesc);
    console.log("Creating new collection item with parameters: " + name);                 

    res.json({success:true});
})



app.listen(app.get("port"), function() {
    console.log("Now listening on port: ", app.get("port"));
});

//functions


function seeCollection(collection, res, req) {
    
    var result;
    console.log("Retrieving collection ", collection);

    seeCollectionFromDb(collection, function(error, result) {
        console.log("Back from the seeCollectionFromDb function with result: ", result);
        
        if (error) {
            res.status(500).json({success: false, data: error});
        }else {
            //maybe a res.redirect("pages/index", JSON.stringify(result.rows) ?
            //res.render("pages/index", JSON.stringify(result.rows) )
            //return result;
            res.json(result);
            
        }
        
    });
    return result;
    
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