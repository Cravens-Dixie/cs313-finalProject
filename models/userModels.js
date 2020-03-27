//interacts with the database
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');
const saltRounds = 10;


function searchForUser(userName, userPassword, callback) {
    //validate a user and password
    
    var sql = "SELECT username, password FROM collection_owners WHERE username = $1::text";
    var params = [userName];
    console.log("Searching DB for matching username and password: " + userName + " " + userPassword)

    pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        }else {
             console.log(db_results);
             var enteredPassword = userPassword;
             var hash = db_results.rows[0].password;
             
            bcrypt.compare(enteredPassword, hash, function(err, result) {
                if (err) {
                    console.log("An error occurred with password compare");
                    console.log(err);
                    callback(err, null);
                }else {
                    if (result == true) {
                    var results = {user: userName};
                    callback(null,results);
                    }else{
                        results = {success: false};
                        callback(err, results);
                        //TODO: send back to home page with an error message in <div id="addResults">
                    }
                } 
             }) 
        };

        //callback(null, results);// returns results to userController.validateUser()
           
    });
    //var enteredPassword = userPassword;
    //var hash = password;
//  var results = {user:[{userName: userName, password: password}]};

    //  callback(null, results);
};
 
    


function insertNewUser(userName, password, callback) {
    //Create a new user and password
    var enteredPassword = password;
    bcrypt.hash(enteredPassword, saltRounds, function(err, hash) {
        var sql = "INSERT INTO collection_owners(username, password) VALUES ($1::text,$2::text)";
        var params = [userName, hash]; 

        pool.query(sql, params, function(err, db_results) {
            if (err) {
                console.log("An error occurred with the DB");
                console.log(err);
                callback(err, null);
            }else {
                console.log("New User: " + userName + " inserted into DB");
                console.log(db_results);

                
                callback(null, db_results);
            };
        //callback (null, results); // returns results to userController.createNewUser()  
        });

    });
    //var results = {user:[{userName: "Cat Cravens", password: "catWORD"}]};
    var results = {user:userName};
    callback(null, results); 
};

module.exports = {
    searchForUser: searchForUser,
    insertNewUser: insertNewUser
};

