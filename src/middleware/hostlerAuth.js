const Hostler = require('../models/hostler');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await Hostler.findOne({ _id: decoded._id, 'tokens.token': token });
        if(!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch(e) {
        res.status(400).send(e);
    }
}

module.exports = auth;