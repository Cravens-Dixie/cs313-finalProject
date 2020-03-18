var express = require("express");
var app = express();
const path = require('path');
const url = require('url');
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://catherine:jinx@localhost:5432/collection";
const pool = new Pool({connectionString: connectionString});
const collectionController = require("./controllers/collectionController.js");

app.set("port", (process.env.PORT || 5000));


app.use(express.urlencoded({ extended : true}));
app.use(express.json());

//endpoints
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));

app.get("/seeCollections", collectionController.seeCollections);

app.get("/seeCollection", collectionController.seeCollection);

app.post("/logIn", function(req, res) {
    //validate a user and password
    console.log("Validating an owner with name and password ");

    res.json({success:true});
});

app.post("/newUser", function(req, res) {
    //Create a new user and password
    console.log("Creating a new owner");

    res.json({success:true});
});

app.post("/newCollection", collectionController.createCollection);

app.post("/newItem", collectionController.createItem);



app.listen(app.get("port"), function() {
    console.log("Now listening on port: ", app.get("port"));
});





