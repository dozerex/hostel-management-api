const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    RoomNumber: {
        type: String,
        required: true,
        index: true,
        dropDups: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
        minvalue: 1,
        maxvalue: 3,
    },
})