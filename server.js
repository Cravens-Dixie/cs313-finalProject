var express = require("express");
var app = express();
const path = require('path');
const url = require('url');
require('dotenv').config();

const collectionController = require("./controllers/collectionController.js");
const userController = require("./controllers/userController.js");

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

//endpoints
app.get('/', (req, res) => res.render('collectionCentral'));
app.get("/seeCollections", collectionController.seeCollections);
app.get("/seeCollection", collectionController.seeCollection);
app.post("/newCollection", collectionController.createCollection);
app.post("/newItem", collectionController.createItem);

app.post("/logIn", userController.validateUser);
app.post("/newUser", userController.createNewUser);

app.listen(PORT, function() {
    console.log("Now listening on port: " + PORT);
});





