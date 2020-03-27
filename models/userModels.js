//interacts with the database
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');
const saltRounds = 10;


function searchForUser(userName, userPassword, callback) {
    //validate a user and password
    var sql = "SELECT (password = crypt($2::text, password)) AS pwd_match FROM collection_owners WHERE username = $1::text";
    var params = [userName, userPassword];
    console.log("Searching DB for matching username and password: " + userName + " " + userPassword)

    pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        }else {
            console.log("Here are the results you are looking for: " + db_results.rows);//not getting back results
            if (db_results.rows.pwd_match == "false") {
                console.log("Password or username is not a match.");
                var results = ("User Name or password does not match. Please try again.");
                callback(null, results);
                $("#clientResults").append(results);
            }else {
                console.log("Found DB results: ");
                console.log(db_results); 
           
                var results = userName;
                console.log("Returning user name: " + userName);
            };
        };

        callback(null, db_results);// returns results to userController.validateUser()
           
    });
//  var results = {user:[{userName: userName, password: password}]};

    //  callback(null, results);
};

    


function insertNewUser(userName, password, callback) {
    //Create a new user and password
    var sql = "INSERT INTO collection_owners(username, password) VALUES ($1::text, crypt($2::text, gen_salt('bf')))";
    var params = [userName, password]; 

    pool.query(sql, params, function(err, db_results) {
        if (err) {
            console.log("An error occurred with the DB");
            console.log(err);
            callback(err, null);
        }else {
            console.log("New User: " + userName + "inserted into DB");
            var results = userName;
             callback(null, db_results);
        };
        callback (null, results); // returns results to userController.createNewUser()  
    });


    //var results = {user:[{userName: "Cat Cravens", password: "catWORD"}]};

    //callback(null, results); 
};

module.exports = {
    searchForUser: searchForUser,
    insertNewUser: insertNewUser
};

