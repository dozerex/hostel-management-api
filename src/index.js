const express = require('express');
require('./db/mongoose');
const cors = require('cors')

const cookieParser = require('cookie-parser');

const admin = require('./routers/admin');
const hostler = require('./routers/hostler');
const room = require('./routers/room');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(admin);
app.use(hostler);
app.use(room);


app.listen(port, () => {
    console.log('Server is up on port '+ port);
})