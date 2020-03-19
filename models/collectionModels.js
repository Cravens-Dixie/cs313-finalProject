const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://catherine:jinx@localhost:5432/collection";
const pool = new Pool({connectionString: connectionString});

function getCollectionByName(collection, callback) {
    var sql = "SELECT item_name, item_description FROM collections WHERE collection_name = $1::text";
    var params = [collection];
    console.log("Retrieving collection from DB with collection name: " + collection);

    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });
   
    callback(result);
    
};

function getCollectionByOwner(owner, callback) {
    console.log("Get collection from DB by owner: " + owner);
    
    
    var results = {
        collections: [
            {collection_owner:owner, collection_name:"Squishmallows"},
            {collection_owner:owner, collection_name:"Puppy Pals"}
        ]
    };
    callback(results);
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