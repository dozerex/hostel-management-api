const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid E-mail address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    // room: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Complaint'
    // },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

// hostlerSchema.virtual('complaints', {
//     ref: 'Complaint',
//     localField: '_id',
//     foreignField: 'owner'
// })

hostlerSchema.statics.findByCredentials = async function (email, password) {
    const user = await Hostler.findOne({email});
    if(!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

hostlerSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});

    await user.save();
    return token;
}

hostlerSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}


hostlerSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
    
})

const Hostler = mongoose.model('Hostler', hostlerSchema);

module.exports = Hostler;

