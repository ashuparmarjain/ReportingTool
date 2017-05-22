var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) {};
  con.query("CREATE DATABASE tli_rt", function (err, result) {
    if (err) { console.log('db already created');};
  });
});