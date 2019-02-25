const mongoose = require('mongoose');

const UrlType = mongoose.model('UrlType', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    list: {
        type: Object,
        required: true,
        minlength: 1
    }
});

module.exports = {UrlType};