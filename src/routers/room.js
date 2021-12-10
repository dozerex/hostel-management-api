const express = require('express');

const Room = require('../models/room');
const User = require('../models/hostler');

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

router.post('/admin/changeRoom', async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        const roomNumber = Number(req.body.room);
        console.log(roomNumber);
        const room = await Room.findOne({
            roomNumber,
            rem: {$gt: 0}
        })
        user.room = room._id;
        console.log(user.room)
        await user.save();
        room.occupied-=1;
        room.save();
        res.send(user);
    } catch(e) {
        res.status(400).send();
    }
})

// router.post('/admin/changeRoom/:roomNumber', async (req, res) => {
//     try {
//         const roomNumber = Number(req.params.roomNumber)
//         const room = await Room.findOne({roomNumber});
//         await room.populate({path: 'hostlers'});
//         res.send(room.hostlers);
//     } catch(e) {
//         res.status(400).send(e);
//     }
// })


module.exports = router;