const express = require('express');

const User = require('../models/hostler')
const Room = require('../models/room');

const router = new express.Router();

router.get('/admin', async (req, res) => {
    res.send("<h1>This is IIITL - Hostel Management API</h1>");
})


// router.post('/admin/login',)

router.post('/admin/addUser', async (req, res) => { 
    try {
        if(!req.body.room) {
            const room = await Room.findOne({
                rem: {$gt: 0}
            });
            console.log(room);
            req.body.room = room._id;
            console.log("no room given");
        } else {
            const roomNumber = Number(req.body.room);
            console.log(roomNumber);
            const room = await Room.findOne({
                roomNumber,
                rem: {$gt: 0}
            })
            // console.log(room);
            req.body.room = room._id;
            console.log("room given");
        }
        console.log(req.body.room);
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now()+300000),
            // secure: true    
        })
        res.status(201).send(user);
    } catch(e) {
        res.status(400).send(e);
    }
})


module.exports = router;