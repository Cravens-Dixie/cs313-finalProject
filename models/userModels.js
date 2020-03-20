//interacts with the database
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://catherine:jinx@localhost:5432/collection";
const pool = new Pool({connectionString: connectionString});

function searchForUser(userName, password, callback) {
    //validate a user and password
    console.log("Searching DB for username and password: " + userName + " " + password)
    var results = {user:[{userName: userName, password: password}]};

    callback(null, results);
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

