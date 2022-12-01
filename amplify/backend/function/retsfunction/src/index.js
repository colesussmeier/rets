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
     const zip = event.pathParameters.zip;
 
     pool.getConnection(function(err, connection) {
         connection.query( "select Date, ZHVI from zhvi_processed where ZipCode = " + zip + ";", function (error, results, fields) {
         connection.release();
         if (error) {
             callback(error);
         }
         else {
             const response = {
                 statusCode: 200,
                 //  Uncomment below to enable CORS requests
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Headers": "*",
                     "content-length": "*"
                 }, 
                 body: JSON.stringify(results),
                 };
                 callback(null, response);
             }
         });
     });
 };
