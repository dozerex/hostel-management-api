const mongoose = require('mongoose');

const hostlerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const Hostler = mongoose.model('Hostler', hostlerSchema);

module.exports = Hostler;

