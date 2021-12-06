const express = require('express');
const Hostler = require('../models/hostler');

const router = express.Router();

router.post('/', async (req, res) => {
    res.send("Hello hostlers");
})

router.post('/login', async (req, res) => {
    try {
        const user = await Hostler.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch(e) {
        res.send(400).send(e);
    }
})

module.exports = router;