const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function getCollectionByName(collection, callback) {
     var sql = "SELECT item_name, item_description, photo FROM collections WHERE collection_name = $1::text";
     var params = [collection];

     pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        } else { 
           var results = {
               collection:db_results.rows
           };
          callback(results);//returns results to collectionController.seeCollection();
       }
    });  
};

function getCollectionByOwner(owner, callback) {
    var sql = "SELECT DISTINCT collection_name FROM collections WHERE collection_owner = $1::text";
    var params = [owner];
    
    pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err); 
            callback(err, null);
        } else {
           var results = {
               collection:db_results.rows
           };
           callback(results);// returns results to collectionController.seeCollections()
       }
    });
};

function createNewCollection(name, owner, itemName, itemDesc, callback) {
    var sql = "INSERT INTO collections(collection_name, collection_owner, item_name, item_description) VALUES ($1::text, $2::text, $3::text, $4::text)";
    var params = [name, owner, itemName, itemDesc];

    pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        } else {
           callback(db_results);// returns results to collectionController.createCollection()
       }      
    });
};

function createNewItem(name, owner, itemName, itemDesc, callback) {
    var sql = "INSERT INTO collections(collection_name, collection_owner, item_name, item_description) VALUES ($1::text, $2::text, $3::text, $4::text)";
    var params = [name, owner, itemName, itemDesc];

    pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        } else {
           callback(db_results);// returns results to collectionController.createItem()   
        }
    });
}


module.exports = {
    getCollectionByName: getCollectionByName,
    getCollectionByOwner: getCollectionByOwner,
    createNewCollection: createNewCollection,
    createNewItem: createNewItem
};