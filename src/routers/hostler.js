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

module.exports = router;