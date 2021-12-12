const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/hostler')

const Complaint = require('../models/complaint');

const auth = require('../middleware/hostlerAuth');

const router = new express.Router();

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload valid image"));
        }
        cb(undefined, true);
    }
})

router.post('/addComplaint', auth, upload.single('complaintImg'), async (req, res) => {
    // console.log(req);
    // return res.send();
    const owner = req.user._id;
    const buffer = await sharp(req.file.buffer).resize({ width:250, height: 250 }).png().toBuffer();
    req.body.complaintImg = buffer;
    const complaint = new Complaint({
        ...req.body,
        owner: req.user._id,
    });
    await complaint.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

router.get('/complaintImg/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.populate({path: 'complaints'})
        console.log(user);
        res.set('Content-Type', 'image/png')
        console.log(user.complaints)
        res.send(user.complaints[0].complaintImg);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
})

module.exports = router;