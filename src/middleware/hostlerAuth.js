const Hostler = require('../models/hostler');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        console.log("hello");
        const token = req.cookies.token;
        console.log(token);
        // const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await Hostler.findOne({ _id: decoded._id, 'tokens.token': token });
        if(!user) {
            throw new Error();
        }
        console.log("charana")
        req.user = user;
        next();
    } catch(e) {
        console.log("dei")
        res.status(400).send(e);
    }
}

module.exports = auth;