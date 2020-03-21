const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

function getCollectionByName(collection, callback) {
     var sql = "SELECT item_name, item_description FROM collections WHERE collection_name = $1::text";
     var params = [collection];
     console.log("Retrieving collection from DB with collection name: " + collection);

     pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        } else {
           console.log("Found DB results: ");
           console.log(db_results); 
           
           var results = {
               collection:db_results.rows
           };

           callback(results);//***Not returning results */ returns results to collectionController.seeCollection()
           console.log("Returning db results for " + collection);
       }

    });
    
};

function getCollectionByOwner(owner, callback) {
    var sql = "SELECT DISTINCT collection_name FROM collections WHERE collection_owner = $1::text";
    var params = [owner];
    console.log("Get collection from DB by owner: " + owner);
    
    pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        } else {
           console.log("Found DB results: ");
           console.log(db_results); 
           
           var results = {
               collection:db_results.rows
           };

           callback(results);// returns results to collectionController.seeCollections()
           console.log("Returning db results for " + owner);
       }

    });
 
};

function createNewCollection(name, owner, callback) {
    console.log("Create a new collection in the DB with: " + name + " and " + owner);

    results = ({name: name, owner: owner});

    callback(results);
};

function createNewItem(name, owner, callback) {
    console.log("Created a new item in the collection: " + name + " with owner: " + owner);
    results = ({name:name, owner:owner});

    callback(results);
};

module.exports = {
    getCollectionByName: getCollectionByName,
    getCollectionByOwner: getCollectionByOwner,
    createNewCollection: createNewCollection,
    createNewItem: createNewItem
};