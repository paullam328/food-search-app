var mysql = require('mysql');
var pool = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timeout: 10000000
    }
);

pool.getConnection((err, connection) => {
    console.log("getting connection");
    if (err) {
        console.log("error: " + err);
    } else {
        console.log("connection successful");
    }
});
module.exports = pool;