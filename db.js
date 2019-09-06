var mysql = require('mysql');
var settings = require('./dbSettings.json');
var db;
var connection ;
function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);
        connection = mysql.createConnection({multipleStatements: true});
        db.connect(function(err){
            if(!err) {
                //console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();