const mongoose = require('mongoose');

const DlTimestamp = mongoose.model('DlTimestamp', {
    url: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    timestamp: {
        type: String,
        required: true,
        minlength: 1
    }
});

module.exports = {DlTimestamp};