const express = require('express');

const router = express.Router();

router.post('/admin', async (req, res) => {
    res.send("<h1>This is IIITL - Hostel Management API</h1>");
})


module.exports = router;