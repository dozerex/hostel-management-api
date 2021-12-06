const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid E-mail address");
            }
        }
    },
    password: {
        type: String,
        required: true,
    }
})


hostlerSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
    
})

const Hostler = mongoose.model('Hostler', hostlerSchema);

module.exports = Hostler;

