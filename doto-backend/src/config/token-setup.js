const jwt = require("jsonwebtoken");
const response = require("../constants/http-response");
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(response.UNAUTHORIZED);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(response.FORBIDDEN);
        } // Error if mismatch between user and token

        req.user = user;
        next();
    });
}

module.exports.generateAccessToken = generateAccessToken;
module.exports.authenticateToken = authenticateToken;
