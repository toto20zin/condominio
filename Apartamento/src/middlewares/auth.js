const jsonwebtoken = require("jsonwebtoken");

const validate = (req, res, next) => {
    const token  = req.headers.authorization?.split(" ")[1];
    // 0
    //Bearer token

    if(!token) res.status(401).send({message : "Access Denied. No token provided."}).end();
   
    try {
        const payload = jsonwebtoken.verify(token, process.env.SECRET_JWT);

        req.headers['user'] = payload;

        next();
        // res.send(payload).end();
    }catch(err) {
        res.status(500).send(err).end();
    }
}

module.exports = validate;