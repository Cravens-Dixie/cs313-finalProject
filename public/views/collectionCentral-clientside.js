//runs the javascript functions from the collectionCentral.html page

//take the user to /logIn and then to /seeCollections
function submitUser() {
    console.log("Verifying user");
    var userName = $("#name").val();
    var password = $("#password").val();
    console.log("Name: " + userName + " and password: " + password);

     $.get("/logIn", {userName: userName, password: password}, function(data) {
         console.log("Back from server with user data:");
         console.log(data);

         var owner = data.user[0].userName;

        $.get("/seeCollections", {owner: owner}, function(data) {
            console.log("Back from server with collections by owner: ");
            console.log(data);

            for (var i = 0; i < data.collection.length; i++) {
                var collectionName = data.collection[i].collection_name;

                $("#collectionName")
                .append("<option value=" + collectionName + ">" + collectionName + "</option>");
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
        $("#collectionResults").append("<h2>Collection:" + collection + "</h2><ul>");

         for (var i = 0; i < data.collection.length; i++) {
             var collectionItem = data.collection[i];
            
             $("#collectionResults").append("<li>" + collectionItem.item_name + " -- " + collectionItem.item_description + "</li>");
            
         };

         $("#collectionResults").append("</ul>");
     });
    
}