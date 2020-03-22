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
        
        $("#collectionResults").append("<h2>Collection:" + collection + "</h2><ul>");

         for (var i = 0; i < data.collection.length; i++) {
             var collectionItem = data.collection[i];
            
             $("#collectionResults").append("<li>" + collectionItem.item_name + " -- " + collectionItem.item_description + "</li>");
            
         };

        $("#collectionResults").append("</ul>");
        $("#addItem").append("<h3> Add an item to this collection</h3>");
        $("#addItem").append("<form action=\"#\" method=\"POST\" id=\"insertItem\">" + 
        "<label for=\"itemName\">Name:</label><br>" + 
        "<input type=\"text\" id=\"itemName\" name=\"itemName\"><br>" +  
        "<label for=\"itemDesc\">Item description:</label><br>" + 
        "<input type=\"text\" id=\"itemDesc\" name=\"itemDesc\"><br>" + 
        "<input type=\"button\" name=\"submit_form\" id=\"item_submit\" value=\"Add Item\" onclick=\"addItemtoDB()\"> " +  
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
        
        $("#addResults").append("<h4>Item Added!</h4>");
        $("#addResults").append("<p> Item:" + data.itemName + " Description: " +  data.itemDesc + "</p>");
    });
}

