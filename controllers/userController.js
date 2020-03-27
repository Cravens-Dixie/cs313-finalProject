const userModel = require("../models/userModels");

function validateUser(req, res) {
    //validate a user and password
    var userName = req.query.userName; //comes from query
    var userPassword = req.query.userPassword; // comes from query
    console.log("Validating an owner with name and password " + userName + " " + userPassword);

    userModel.searchForUser(userName, userPassword, function(error, results){
        res.json(results);
    });
}

function createNewUser(req, res) {
    //Create a new user and password
    var userName = req.body.userName; //comes from query
    var password = req.body.password; // comes from query
    console.log("Creating a new owner");

    userModel.insertNewUser(userName, password, function(error, results) {
        res.json(results);
    }); 
};

module.exports = {
    validateUser: validateUser,
    createNewUser: createNewUser 

};