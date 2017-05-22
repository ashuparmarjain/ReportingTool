var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tli_rt"
});

con.connect(function(err) {
  if (err) {};
  var sql = "CREATE TABLE tlipost (ID int NOT NULL AUTO_INCREMENT,date VARCHAR(255), url TEXT, sessions int, pageviews int,PRIMARY KEY (ID))";
  con.query(sql, function (err, result) {
    if (err) {};
    console.log("Table already created");
  });
});