//runs the javascript functions from the collectionCentral.html page

//take the user to /logIn
function submitUser() {
    console.log("Verifying user");
    var name = $("#name").val();
    var password = $("#password").val();
    console.log("Name: " + name + "and password: " + password);

    $.post("/logIn", {name: name, password: password}, function(data) {
        console.log("Back from server with:");
        console.log(data);

        
    })

}

//take user to /seeCollection
function chooseCollection() {
    console.log("Getting collection");
    var collection = $("#collectionName").val();
    console.log("Collection: " + collection); 

    $.get("/seeCollection", {collection: collection}, function(data) {
        console.log("Back from server with:");
        console.log(data);

        for (var i = 0; i < data.list.length; i++) {
            var collectionItem = data.list[i];
    
            $("#collectionResults").append("<li>" + collectionItem.item_name + " " + collectionItem.item_description + "</li>");
        }
    })
    
}