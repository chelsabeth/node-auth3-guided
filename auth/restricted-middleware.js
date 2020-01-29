const jwt = require('jsonwebtoken');

const { jwtSecret } = require("../config/secret.js");

module.exports = (req, res, next) => {
 const token = req.headers.authorization;

 if(token) {
   jwt.verify(token, jwtSecret, (err, decodedToken) => {
     if(err) {
        // the token is not valid
        res.status(401).json({ you: 'cant touch this' })
     } else {
       req.user = decodedToken.user;

       next();
     }
   }) // if you change the secret, it will fail 
 } else {
   res.status(401).json({ you: 'shall not pass!' })
 }
};
