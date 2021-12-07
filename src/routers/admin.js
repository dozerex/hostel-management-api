const express = require('express');

const User = require('../models/hostler')

const router = new express.Router();

router.post('/admin', async (req, res) => {
    res.send("<h1>This is IIITL - Hostel Management API</h1>");
})

router.post('/admin/addUser', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
})


module.exports = router;