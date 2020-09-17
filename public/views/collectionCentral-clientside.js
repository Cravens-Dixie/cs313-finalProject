//runs the javascript functions from the collectionCentral.html page

//take the user to /logIn and then to /seeCollections
function submitUser() {
    var userName = $("#name").val();
    var userPassword = $("#password").val();

    $.post("/logIn", {userName: userName, userPassword: userPassword}, function(data) {//data from userController validateUser()
        if (data.success == true) {
            $("#startUp").empty();
            $("#logIn").empty();
            $("#clientResults").text("Welcome " + userName + "! Select a collection or start a new one.");
            var owner = userName;
            sessionStorage.setItem("collectionOwner", owner);
            
            $.get("/seeCollections", {owner: owner}, function(data) {//data coming from collectionController seeCollections()
                for (var i = 0; i < data.collection.length; i++) {
                    var collectionName = data.collection[i].collection_name;
                    $("#collectionName").append("<option>" + collectionName + "</option>");  
                };
            });
        }else if(data.success == false) {
                $("#clientResults").text("Invalid user name or password."); 
        }else {
            $("#clientResults").text("There was an unknown issue. Please try again later.");
        } 
    });
}
 
//take user to /seeCollection
function chooseCollection() {
    //get collection name from collection drop down menu created with successful log in
    var collection = $("#collectionName").val();
  
    $.get("/seeCollection", {collection: collection}, function(data) {//data comes from collectionController seeCollection()
        sessionStorage.setItem("collectionName", collection);
        console.log(data);
        //empty out any previous results then append new collection results
        $("#collectionResults").empty();
        $("#collectionResults").append("<h2>Collection:" + collection + "</h2><ul>");

         for (var i = 0; i < data.collection.length; i++) {
             var collectionItem = data.collection[i];
            
             $("#collectionResults").append("<li><img src=\"" + collectionItem.photo + "\" class=\"img-fluid img-thumbnail\" alt=\"Not Avail\">" + collectionItem.item_name + " -- " + collectionItem.item_description + "</li>"); 
         };
         //a form to add an item to the currently selected collection
        $("#collectionResults").append("</ul>");
        $("#addItem").empty().append("<h3> Add an item to this collection</h3>");
        $("#addItem").append("<form action=\"#\" method=\"POST\" id=\"insertItem\">"); 
        $("#addItem").append("<label for=\"itemName\">Name:</label><br>" + 
        "<input type=\"text\" id=\"itemName\" name=\"itemName\"><br>" +  
        "<label for=\"itemDesc\">Item description:</label><br>" + 
        "<input type=\"text\" id=\"itemDesc\" name=\"itemDesc\"><br><br>" + 
        "<input type=\"button\" name=\"submit_form\" id=\"item_submit\" value=\"Add Item\" onclick=\"addItemtoDB()\"> " +
        "</form>");
     });
    
}
//onclick event (button) in "Add Item" form under chooseCollection()
function addItemtoDB() {
    //need collection_name, collection_owner, item_name, item_description
    var collectionName = sessionStorage.getItem("collectionName");
    var collectionOwner = sessionStorage.getItem("collectionOwner");
    var itemName = $("#itemName").val();
    var itemDesc = $("#itemDesc").val();

    //clear form
    $("#itemName").val("");
    $("#itemDesc").val("");
    
    $.post("/newItem", {collectionName: collectionName, collectionOwner: collectionOwner, itemName: itemName, itemDesc: itemDesc}, function(data) { 
        $("#addResults").empty().append("<h4>Item Added!</h4>");
        $("#addResults").append("<p> Item:" + data.item + " Description: " +  data.description + "</p>");
        $("#collectionResults").append("<li>" + data.item + " -- " + data.description + "</li>"); 
    }); 
}

function newUser() {
    //need userName and userPassword
    var userName = $("#name").val();
    var userPassword = $("#password").val();

    sessionStorage.setItem("collectionOwner", userName);

    $.post("/newUser", {userName: userName, userPassword: userPassword},function(data){
        $("#clientResults").append("Welcome " + userName + "! Please start a new collection.");
    });
}

function newCollection() {
    //need  to collect the collection_name, (collection_owner), item_name, and item_description from user
    //will forward info by 'onclick' event to addCollectiontoDB()
    var userName = sessionStorage.getItem("collectionOwner");

    //clear out other forms and divs
    $("#collectionResults").empty();
    $("#addItem").empty();
    $("#addResults").empty();

    //create and add the form to the collectionCentral.ejs page
    $("#newCollectForm").append("<h4>You must provide one item in the collection to start a collection.</h4>");
    $("#newCollectForm").append("<form action=\"#\" method=\"POST\" id=\"insertCollection\">" + 
    "<label for=\"colName\"> Collection Name:</label><br>" + 
    "<input type=\"text\" id=\"colName\" name=\"colName\"><br>" + 
    "<label for=\"item\">Item Name:</label><br>" + 
    "<input type=\"text\" id=\"item\" name=\"item\"><br>" +  
    "<label for=\"desc\">Item description:</label><br>" + 
    "<input type=\"text\" id=\"desc\" name=\"desc\"><br><br>" + 
    "<input type=\"button\" name=\"submit_form\" id=\"col_submit\" value=\"Add Collection\" onclick=\"addCollectiontoDB()\"> " +  
    "</form>");
}

//onclick event from newCollection() form
function addCollectiontoDB() {
    var name = $("#colName").val();
    var owner = sessionStorage.getItem("collectionOwner");
    var itemName = $("#item").val();
    var itemDesc = $("#desc").val();

    $.post("/newCollection", {owner: owner, name: name, itemName: itemName, itemDesc: itemDesc}, function(data) {
        $("#addResults").append("<h4>Collection " + data.collection + "  Added!</h4>");
        $("#collectionName").append("<option>" + data.collection + "</option>");
    });
}

