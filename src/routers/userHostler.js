const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    res.send("Hello hostlers");
})

module.exports = router;