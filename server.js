var express = require("express");
var app = express();
const path = require('path');
const url = require('url');

const collectionController = require("./controllers/collectionController.js");
const userController = require("./controllers/userController.js");

app.set("port", (process.env.PORT || 5000));


app.use(express.urlencoded({ extended : true}));
app.use(express.json());

//endpoints
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('collectionCentral.html'));
app.get("/seeCollections", collectionController.seeCollections);
app.get("/seeCollection", collectionController.seeCollection);
app.post("/newCollection", collectionController.createCollection);
app.post("/newItem", collectionController.createItem);
app.post("/logIn", userController.validateUser);
app.post("/newUser", userController.createNewUser);

app.listen(app.get("port"), function() {
    console.log("Now listening on port: ", app.get("port"));
});





