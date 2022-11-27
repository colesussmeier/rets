/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

var mysql = require('mysql');
var creds = require('./rdsconfig.json');

var pool = mysql.createPool({
    host : creds.dbhost,
    user : creds.dbuser,
    password : creds.dbpassword,
    database : creds.dbname
});


 exports.handler = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;

    pool.getConnection(function(err, connection) {
        connection.query( "select * from zhvi_processed where ZipCode = '10516' limit 1;", function (error, results, fields){
            connection.release();

            if (error) callback(error);
            else callback(null, results[0]);
        });
    });
};
