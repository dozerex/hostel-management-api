const mongoose = require('mongoose');

const Hostler = require('./hostler');

const roomSchema = mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
        index: true,
        dropDups: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
        default: 3,
        minvalue: 1,
        maxvalue: 3,
    },
    occupied: {
        type: Number,
        required: true,
        default: 0,
        minvalue: 0,
        maxvalue: 3,
    },
    rem: {
        type: Number,
        maxvalue: 3,
        minvalue: 0
    }
}, {
    timestamps: true,
})

roomSchema.virtual('hostlers', {
    ref: 'Hostler',
    localField: '_id',
    foreignField: 'room',
});

roomSchema.pre('save', async function (next) {
    const user = this;
    user.rem = user.capacity - user.occupied;
    next();
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;