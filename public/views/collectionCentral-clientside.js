//runs the javascript functions from the collectionCentral.html page

//take the user to /logIn
function submitUser() {
    console.log("Verifying user");
    var userName = $("#name").val();
    var password = $("#password").val();
    console.log("Name: " + userName + " and password: " + password);

     $.get("/logIn", {userName: userName, password: password}, function(data) {
         console.log("Back from server with:");
         console.log(data);

         var owner = data.user[0].userName;

        $.get("/seeCollections", {owner: owner}, function(data) {
            console.log("Back from server with: ");
            console.log(data);

            for (var i = 0; i < data.collections.length; i++) {
                var collectionName = data.collections[i].collection_name;

                $("#collectionName")
                .append("<option value=" + collectionName + ">" + collectionName + "</option>");
            };

        });
        
    });
    

}

//take user to /seeCollection
function chooseCollection() {
    console.log("Getting collection");
    var collection = $("#collectionName").val();
    console.log("Collection: " + collection); 

    $.get("/seeCollection", {collection: collection}, function(data) {
        console.log("Back from server with the collection:" );
        console.log(data);

         for (var i = 0; i < data.collections.length; i++) {
             var collectionItem = data.collections[i];
    
             $("#collectionResults").append("<h2>Collection:" + collection + "</h2><ul><li>" + collectionItem.item_name + " " + collectionItem.item_description + "</li></ul>");
         };

        
     });
    
}