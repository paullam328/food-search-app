var resultsNotFound = {
    "errorCode" : "0",
    "errorMessage" : "Server Error",
    "rowCount" : "0",
    "data" : ""
};

module.exports = {
    checkInputDataNULL: (req, res) => {
        if (!req.body) return res.send(resultsNotFound);
    }
    ,
    checkInputDataQuality: (req, res) => {
        resultsNotFound.errorMessage = "There is no data submitted from Client.";
        if (!req.body.inputEmail == "") return res.send(resultsNotFound);
    },
    checkJWPToken: (req, res) => {
        const token = req.headers.token;
        if (!token) res.sendStatus(400);
        //if token exists:
        const decoded = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.JWT_SECRET
        );
        resultsNotFound["errorMessage"] = "Your token is invalid, please logoff";
        if (!decoded) return res.send(resultsNotFound);
        return decoded.email;
    }
}