const userModel = require("../models/userModels");

function validateUser(req, res) {
    //validate a user and password
    var userName = req.body.userName; //comes from query
    var userPassword = req.body.userPassword; // comes from query
    console.log("Validating an owner with name and password " + userName + " " + userPassword);

    userModel.searchForUser(userName, userPassword, function(error, result){//returns results to cc-clientside submitUser()
        if(error||result == null) {
            var message =  {success: false}; 
            res.json(message);
           
        }else {
            var message = ({success: true});
            res.json(message);
            
        }
        
    });
}

function createNewUser(req, res) {
    //Create a new user and password
    var userName = req.body.userName; //comes from post body
    var password = req.body.userPassword; // comes from post body
    console.log("Creating a new owner");

    userModel.insertNewUser(userName, password, function(error, results) {
        res.json(results);
    }); 
};

module.exports = {
    validateUser: validateUser,
    createNewUser: createNewUser 

};