//runs the javascript functions from the collectionCentral.html page

//take the user to /logIn and then to /seeCollections
function submitUser() {
    console.log("Verifying user");
    var userName = $("#name").val();
    var userPassword = $("#password").val();
    console.log("Name: " + userName + " and password: " + userPassword);

     $.get("/logIn", {userName: userName, userPassword: userPassword}, function(data) {
         console.log("Back from server with user data:");
         console.log(data);
         $("#addResults").append(data);

         var owner = userName;

         sessionStorage.setItem("collectionOwner", owner);
        

        $.get("/seeCollections", {owner: owner}, function(data) {
            console.log("Back from server with collections by owner: ");
            console.log(data);

            for (var i = 0; i < data.collection.length; i++) {
                var collectionName = data.collection[i].collection_name;

                $("#collectionName")
                .append("<option>" + collectionName + "</option>");
            };

        });
        
    });
    

}

//take user to /seeCollection
function chooseCollection() {
    console.log("Getting collection by name");
    var collection = $("#collectionName").val();
    console.log("Collection: " + collection); 

    $.get("/seeCollection", {collection: collection}, function(data) {
        console.log("Back from server with the selected collection and data:" );
        console.log(data);

        sessionStorage.setItem("collectionName", collection);

        $("#collectionResults").empty();
        $("#collectionResults").append("<h2>Collection:" + collection + "</h2><ul>");

         for (var i = 0; i < data.collection.length; i++) {
             var collectionItem = data.collection[i];
            
             $("#collectionResults").append("<li>" + collectionItem.item_name + " -- " + collectionItem.item_description + "</li>");
            
         };

        $("#collectionResults").append("</ul>");
        $("#addItem").empty().append("<h3> Add an item to this collection</h3>");
        $("#addItem").append("<form action=\"#\" method=\"POST\" id=\"insertItem\">"); 
        $("#addItem").append("<label for=\"itemName\">Name:</label><br>" + 
        "<input type=\"text\" id=\"itemName\" name=\"itemName\"><br>" +  
        "<label for=\"itemDesc\">Item description:</label><br>" + 
        "<input type=\"text\" id=\"itemDesc\" name=\"itemDesc\"><br>" + 
        "<input type=\"button\" name=\"submit_form\" id=\"item_submit\" value=\"Add Item\" onclick=\"addItemtoDB()\"> " +
        "<input type=\"reset\" value=\"Reset Form\">"  +
        "</form>");
     });
    
}
function addItemtoDB() {
    //need collection_name, collection_owner, item_name, item_description
    var collectionName = sessionStorage.getItem("collectionName");
    var collectionOwner = sessionStorage.getItem("collectionOwner");
    var itemName = $("#itemName").val();
    var itemDesc = $("#itemDesc").val();
    console.log ("adding an item to the DB" + itemName + " " + itemDesc);

    $.post("/newItem", {collectionName: collectionName, collectionOwner: collectionOwner, itemName: itemName, itemDesc: itemDesc}, function(data) {
        console.log("Back from database with a successful add");
        console.log(data);//success or fail
        
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

    console.log("Name: " + userName + " and password: " + userPassword);

    $.post("/newUser", {userName: userName, userPassword: userPassword},function(data){
        $("#clientResults").append("Welcome " + userName + "! Please start a new collection.");
        console.log(data);
    });
}

function newCollection() {
    //need  to collect the collection_name, (collection_owner), item_name, and item_description from user
    //will forward info by 'onclick' event to addCollectiontoDB()
    var userName = sessionStorage.getItem("collectionOwner");
    console.log("Lets create a new collection for " + userName);

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

function addCollectiontoDB() {
    var name = $("#colName").val();
    var owner = sessionStorage.getItem("collectionOwner");
    var itemName = $("#item").val();
    var itemDesc = $("#desc").val();

    console.log("adding: " + owner + name + itemName, itemDesc);

    $.post("/newCollection", {owner: owner, name: name, itemName: itemName, itemDesc: itemDesc}, function(data) {
        console.log(data);
        $("#addResults").append("<h4>Collection " + data.name + "  Added!</h4>");
    });
}

