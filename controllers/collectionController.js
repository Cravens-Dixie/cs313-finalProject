//handles requests from client, sends requests to the model, sends back to client
const collectionModels = require("../models/collectionModels.js");

function seeCollections(req, res){
    //get all collections by collection_owner upon successful login
    //need a owner
    var owner = req.query.owner;
    console.log("Getting all collections by owner:" + owner);
    
    collectionModels.getCollectionByOwner(owner, function(results) {
        res.json(results);
    });
   
};

function seeCollection(req, res) {
    //get a single collection by collection_name 
    const collection = req.query.collection; 

    collectionModels.getCollectionByName(collection, function(results) {
        console.log("Getting a collection by name:")
        res.json(results);
        //res.render("showCollection", results);
    });
 
};

function createCollection(req, res) {
    //create a new collection with collection_name, collection_owner, item_name, item_description, etc
    var name = req.body.name;
    var owner = req.body.owner;
    var params = {name: name, owner: owner};

    console.log("Creating a new collection");

    collectionModels.createNewCollection(name, owner, function(results) {
        res.json(results);
    });
    
};

function createItem(req, res) {
    //create a new item in a collection with collection_name, collection_owner, item_name, item_description, etc
    var name = req.body.name;
    var owner = req.body.owner;
    //var itemName = req.body.itemName;
    //var itemDesc = req.body.itemDesc;
    var params = {name: name, owner: owner};
    //var params = {name: name, owner: owner, itemName: itemName, itemDesc: itemDesc};
    //console.log("Creating new collection item with name: " + name + 
   // ", owner: " + owner + ", item name: " + itemName + ", and item description: " + itemDesc);
    console.log("Creating new collection item with parameters: " + name + ", " + owner);                 

    collectionModels.createNewItem(name, owner, function(results) {
        res.json(results);
    });
    
};


    


module.exports = {
    seeCollections: seeCollections,
    seeCollection: seeCollection,
    createCollection: createCollection,
    createItem: createItem

};