const express = require('express');
require('./db/mongoose');


const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send("<h1>This is IIITL - Hostel Management API</h1>");
})

app.listen(port, () => {
    console.log('Server is up on port '+ port);
})