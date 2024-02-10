const jwt = require("jsonwebtoken");
require("dotenv").config();
const access_token_Key = process.env.access_token_Key;

const auth = (req, res, next) => {
    const token = req.headers.authorization || req.cookies["access_token"];
    if (token) {
        jwt.verify(token, access_token_Key, (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401).send({ "msg": "Token has expired" });
                } else {
                    res.status(400).send({ "msg": "Token verification failed" });
                }
            } else {
                req.body.UserId=decode.UserId;
                req.body.user=decode.user
                console.log(decode,req.body)
                next()
            }
        });
    } else {
        res.status(401).send({ "msg": "Token is missing" });
    }
};

module.exports = { auth };
