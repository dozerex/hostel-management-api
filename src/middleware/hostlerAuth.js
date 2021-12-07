const Hostler = require('../models/hostler');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await Hostler.findOne({ _id: decoded._id, 'tokens.token': token });
        if(!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch(e) {
        res.status(400).send(e);
    }
}

module.exports = auth;