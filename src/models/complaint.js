const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    location: {
        type: String,
        required: true,
        maxlength: 15
    },
    status: {
        type: Number,
        default: 0,
        validate(value) {
            if(value<0 || value>2 ) {
                throw new Error('Must be between 0 and 2');
            }
        }
    },
    image: {
        type: Buffer
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hostler'
    }
}, {
    timestamps: true
});

mongoose.model('Complaint', complaintSchema);