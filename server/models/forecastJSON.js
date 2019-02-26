const mongoose = require('mongoose');

const ForecastJSON = mongoose.model('ForecastJSON', {
    forecastType: {
        type: String,
        require: true
    },
    header: {
        type: Object,
        required: true,
    },
    forecastTime: {
        type: String,
        require: true
    },
    refTimestamp: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        required: true,
    }
});

module.exports = {ForecastJSON};