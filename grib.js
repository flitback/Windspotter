require('./server/config/config');

const {DataCrawler} = require('./src/data_crawler');
const {CheckTimestamp} = require('./src/link_crawler');
const {mongoose} = require('./server/db/mongoose');
const {DlTimestamp} = require('./server/models/dlTimestamp');

const folderurl = 'https://opendata.dwd.de/weather/nwp/icon-eu/grib/';
const times = ['00', '03', '06', '09', '12', '15', '18', '21'];
const forecastTypes = ['t_2m', 'u_10m', 'v_10m', 'vmax_10m', 'clct'];
const url = folderurl + times[0] + '/' + forecastTypes[0] + '/';

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('connection Successful!');

    CheckTimestamp(url, (timestamp) => {
        DlTimestamp.find({url}).then((res) => {
            if (!res[0]) {
                let times = new DlTimestamp({url, timestamp});
                times.save((err, doc) => {
                    if (err) return console.error(err);
                    console.log(doc.url + ' saved to the database');
                });
            } 
            if (res[0].timestamp < timestamp) {
                DlTimestamp.findByIdAndUpdate(res[0]._id , {$set: timestamp});
                DataCrawler(url);
            }
            return console.log('up 2 date');
        });
    });

});
