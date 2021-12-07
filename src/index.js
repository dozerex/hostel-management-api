const express = require('express');
require('./db/mongoose');

const admin = require('./routers/admin');
const hostler = require('./routers/hostler');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(admin);
app.use(hostler);


app.listen(port, () => {
    console.log('Server is up on port '+ port);
})