//handles requests from client, sends requests to the model, sends back to client

function seeCollections(req, res){
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
};

function seeCollection(req, res) {
    //get a single collection by collection_name 
    const collection = req.query.collection;    
    const result = getCollection(collection);
    const params = {collection: collection, result: result};

    console.log("Getting a collection by name:")

    res.render("showCollection", params);
  
};

function createCollection(req, res) {
    //create a new collection with collection_name, collection_owner, item_name, item_description, etc
    console.log("Creating a new collection");

    res.json({success:true});
};

function createItem(req, res) {
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
};

function getCollection(collection, res, req) {
    
    var result;
    console.log("Retrieving collection ", collection);

    getCollectionFromDb(collection, function(error, result) {
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
    
};
    
function getCollectionFromDb(collection, callback) {
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
};

module.exports = {
    seeCollections: seeCollections,
    seeCollection: seeCollections,
    createCollection: createCollection,
    createItem: createItem

};