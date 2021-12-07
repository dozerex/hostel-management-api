const express = require('express');
const Hostler = require('../models/hostler');

const auth = require('../middleware/hostlerAuth');

const router = new express.Router();

router.post('/', async (req, res) => {
    res.send("Hello hostlers");
})

router.post('/login', async (req, res) => {
    try {
        const user = await Hostler.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
})

router.get('/me', auth, async (req, res) => {
    res.send(req.user);
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