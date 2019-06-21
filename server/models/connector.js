const pool = require('./dbconnection');
var resultsNotFound = {
    "errorCode": "0",
    "errorMessage": "Operation not successful.",
    "rowCount": "0",
    "data": ""
};
var resultsFound = {
    "errorCode": "1",
    "errorMessage": "Operation successful.",
    "rowCount": "1",
    "data": ""
};

module.exports = {
    createKeyword: (req, res, type) => {
        console.log("hi1");
        pool.getConnection((err, connection) => {
            console.log("hi2");
            if (err) {
                console.log(err);
                return;
            }
            else {
                console.log("connection successful!");
                //console.log(connection);
            }

            switch (type) {
                case "POST": {
                    var sql = 'INSERT INTO Keywords SET ?';
                    var values = { 'keyword': req.body.keyword };
        
                    //use connection:
                    connection.query(sql, values, (error, results, fields) => {
                    console.log("querying...");
                    if (error) {
                            resultsNotFound["errorMessage"] = error;
                            console.log(resultsNotFound);
                            return res.send(resultsNotFound);
                        } else {
                            console.log("query success!");
                            return res.send(resultsFound);
                        }
                    })
        
                    //when done with the connection, release it.
                    connection.release(); //Handle error after the release
                }
                break;

                case "GET": {
                    var sql = 'SELECT * FROM Keywords';

                    //use connection:
                    connection.query(sql, (error, results, fields) => {
                        console.log("querying...");
                        if (error) {
                            resultsNotFound["errorMessage"] = error;
                            console.log(resultsNotFound);
                            return res.send(resultsNotFound);
                        } else {
                            console.log("query success!");
                            resultsFound.data = results;
                            return res.send(resultsFound);
                        }
                    })

                    
                    //when done with the connection, release it.
                    connection.release(); //Handle error after the release
                }
                break;

                case "DELETE":{
                    console.log(req.body.keyword );
                    var sql = 'DELETE FROM Keywords WHERE keyword = \"'+ req.body.keyword +'\"';
        
                    //use connection:
                    connection.query(sql, values, (error, results, fields) => {
                    console.log("querying...");
                    if (error) {
                            resultsNotFound["errorMessage"] = error;
                            console.log(resultsNotFound);
                            return res.send(resultsNotFound);
                        } else {
                            console.log("query success!");
                            return res.send(resultsFound);
                        }
                    })
        
                    //when done with the connection, release it.
                    connection.release(); //Handle error after the release
                }

                break;

                case "PUT": {
                    var sql = 'UPDATE Keywords SET keyword = \"'+ req.body.ChangeToKeyword +'\" WHERE keyword = \"' + req.body.ChangeFromKeyword + '\"';
        
                    //use connection:
                    connection.query(sql, values, (error, results, fields) => {
                    console.log("querying...");
                    if (error) {
                            resultsNotFound["errorMessage"] = error;
                            console.log(resultsNotFound);
                            return res.send(resultsNotFound);
                        } else {
                            console.log("query success!");
                            return res.send(resultsFound);
                        }
                    })
        
                    //when done with the connection, release it.
                    connection.release(); //Handle error after the release
                }


                break;
            }
        })
    }
}