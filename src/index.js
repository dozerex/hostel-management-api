const express = require('express');
require('./db/mongoose');

const userAdmin = require('./routers/userAdmin');
const userHostler = require('./routers/userHostler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userAdmin);
app.use(userHostler);


app.listen(port, () => {
    console.log('Server is up on port '+ port);
})