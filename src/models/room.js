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
    occupied: {
        type: Number,
        required: true,
        minvalue: 1,
        maxvalue: 3,
    }
})

roomSchema.virtual('hostlers', {
    ref: 'Hostler',
    localField: '_id',
    ForeignField: 'room',
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;