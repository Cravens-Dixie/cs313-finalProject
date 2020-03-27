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
    var collection = req.query.collection; 
    console.log("get a single collection by collection_name");

    collectionModels.getCollectionByName(collection, function(results) {
        console.log("Getting a collection by name: " + collection);
        res.json(results);
    });
 
}

function createCollection(req, res) {
    //create a new collection with collection_name, collection_owner, item_name, item_description, etc
    var name = req.body.name;
    var owner = req.body.owner;
    var itemName = req.body.itemName;
    var itemDesc = req.body.itemDesc;
   

    console.log("Creating a new collection with: " + name + owner + itemName + itemDesc);

    collectionModels.createNewCollection(name, owner, itemName, itemDesc, function(results) {
        res.json(results);
    });
    
}

function createItem(req, res) {
    //create a new item in a collection with collection_name, collection_owner, item_name, item_description, etc
    var name = req.body.collectionName;
    var owner = req.body.collectionOwner;
    var itemName = req.body.itemName;
    var itemDesc = req.body.itemDesc;
    //var params = {name: name, owner: owner, item_name: itemName, itemDesc: itemDesc};
   
    console.log("Adding new item with name: " + itemName + " and " + itemDesc + " for collection " + name)
                   
    collectionModels.createNewItem(name, owner, itemName, itemDesc, function(results) {
        res.json(results);
    });
    
}


    


module.exports = {
    seeCollections: seeCollections,
    seeCollection: seeCollection,
    createCollection: createCollection,
    createItem: createItem

};