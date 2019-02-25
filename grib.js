const download = require('download');
const bz2 = require('unbzip2-stream');
const grib2json = require('grib2json');
const concat = require('concat-stream');
const fs = require('fs');
const filename = 'temp.grib2';

const {LinkCrawler} = require('./src/link_crawler');

const folderurl = 'https://opendata.dwd.de/weather/nwp/icon-eu/grib/';
const times = ['00', '03', '06', '09', '12', '15', '18', '21'];
const forecastTypes = ['t_2m', 'u_10m', 'v_10m', 'vmax_10m', 'clct'];
const url = folderurl + times[0] + '/' + forecastTypes[0] + '/';

LinkCrawler(url, (linkList) => {
    download(linkList[0]).pipe(bz2()).pipe(concat((data)=> {
        fs.writeFileSync(filename, data);
        grib2json.default(filename, {
            data: true
        }, (err, json) => {
            if (err) return console.log(err);
            console.log(json);
            fs.unlink(filename, (err) => {
                if (err) return console.log(err);
            });
        });
    }));
});



