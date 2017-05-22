var fs = require('fs');
var google = require('googleapis');
var analytics = google.analytics('v3');
var key = require('./googleanalytics_project_credentials.json');
var mysql      = require('mysql');


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tli_rt"
});

require('./database.js');
require('./db_table.js');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/analytics.readonly"],
  null
  );

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  // Make an authorized request to list Drive files.
  console.log(analytics.reports);
  analytics.data.ga.get({
    auth:jwtClient,
    "max-results":10,
    ids:"ga:88888888",
    "start-date":"2017-02-15",
    "end-date":"2017-03-01",
    metrics:"ga:sessions,ga:pageviews",
    dimensions:"ga:date,ga:pagePath"
  }, function (err, resp) {
    if(err) {
      return console.log(err);
    }
    var data_tli =resp.rows;
    var sql = "INSERT INTO tlipost (date, url, sessions, pageviews) VALUES ?"; 
    connection.query(sql, [data_tli], function (error, result) {
      if (error) throw error;
      console.log("Number of records inserted: " + result.affectedRows);
    });


  });
});