const express = require('express');
const Hostler = require('../models/hostler');
const jwt = require('jsonwebtoken')

const auth = require('../middleware/hostlerAuth');

const router = new express.Router();

router.get('/', async (req, res) => {
    res.send("Hello hostlers");
})


router.use('/login', async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await Hostler.findOne({ _id: decoded._id, 'tokens.token': token });
        if(!user) {
            console.log("error");
            throw new Error();
        }
        res.redirect('/me');
    } catch(e) {
        res.clearCookie("token");
        next();
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await Hostler.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now()+300000),
            // secure: true    
        })
        res.send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
})

router.get('/me', auth, async (req, res) => {
    res.send({user: req.user, now: "me"});
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        res.send({name: req.user.name, message: "Logout Success!"});
    } catch(e) {
        res.status(500).send();
    }
})

router.post('/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("Logout Successfully from all devices", req.user.name);
    } catch(e) {
        res.status(500).send();
    }
})

module.exports = router;