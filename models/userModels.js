//interacts with the database
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

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
        } else {
            if (result = 'f') {
                console.log("Password or username is not a match.");
                var results = ("User Name or password does not match. Please try again.");

            } else {
                console.log("Found DB results: ");
                console.log(db_results); 
           
                var results = userName;
                console.log("Returning user name: " + userName);
           };

           callback(null,results);// returns results to userController.validateUser()
           
       }

    });

    //  var results = {user:[{userName: userName, password: password}]};

    //  callback(null, results);
}

function insertNewUser(userName, password, callback) {
    //Create a new user and password
    var results = {user:[{userName: "Cat Cravens", password: "catWORD"}]};

    callback(null, results); 
};

module.exports = {
    searchForUser: searchForUser,
    insertNewUser: insertNewUser
};

