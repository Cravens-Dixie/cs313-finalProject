//handles requests from client, sends requests to the model, sends back to client
const collectionModels = require("../models/collectionModels.js");

function seeCollections(req, res){
    //get all collections by collection_owner upon successful login
    //need a owner
    var owner = req.query.owner;

    //send owner to collection model for results from db
    collectionModels.getCollectionByOwner(owner, function(results) {
        res.json(results);//returns results to collectionCentral-clientside.js
    });
   
};

function seeCollection(req, res) {
    //get a single collection by collection_name
    //get collection name from GET 
    var collection = req.query.collection; 

    //send collection name to collection model
    collectionModels.getCollectionByName(collection, function(results) {
        res.json(results);//returns db results as rows to chooseCollection()
    });
 
}

function createCollection(req, res) {
    //create a new collection with collection_name, collection_owner, item_name, item_description, etc
    var name = req.body.name;
    var owner = req.body.owner;
    var itemName = req.body.itemName;
    var itemDesc = req.body.itemDesc;

    collectionModels.createNewCollection(name, owner, itemName, itemDesc, function(results) {
        var results = ({collection: name, owner: owner, item: itemName, description: itemDesc});
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
                   
    collectionModels.createNewItem(name, owner, itemName, itemDesc, function(results) {
        results = ({name:name, owner:owner, item:itemName, description:itemDesc});   
        res.json(results);
    });
    
}


    


module.exports = {
    seeCollections: seeCollections,
    seeCollection: seeCollection,
    createCollection: createCollection,
    createItem: createItem

};