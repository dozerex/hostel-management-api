const express = require('express');

const Room = require('../models/room');

const router = new express.Router();


router.post('/admin/addRoom', async(req, res) => {
    const room = new Room(req.body);
    try {
        await room.save();
        console.log(room);
        res.status(201).send(room);
    } catch(e) {
        res.status(400).send(e)
    }
});

router.post('/admin/roomChange', async(req, res) => {
    
})


module.exports = router;