const mongoose = require('mongoose');
const { string } = require('sharp/lib/is');
const validator = require('validator');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        lowercase: true,
        trim: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true,
})

adminSchema.statics.findByCredentials = async function (email, password) {
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

adminSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});

    await user.save();
    return token;
}

adminSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;