require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {UrlType} = require('./models/url-type');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('connection Successful!');

    let times = new UrlType({
        name: 'ForecastType',
        list: ['t_2m', 'u_10m', 'v_10m', 'vmax_10m', 'clct']
    });

    // times.save((err, doc) => {
    //     if (err) return console.error(err);
    //     console.log(doc.name + ' saved to the database');
    // });
    UrlType.find().then((tmes) => {
        console.log(tmes);
    });

});