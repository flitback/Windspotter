const download = require('download');
const bz2 = require('unbzip2-stream');
const grib2json = require('grib2json');
const concat = require('concat-stream');
const fs = require('fs');

const {LinkCrawler} = require('./../src/link_crawler');

const DataCrawler = (url) => {
    LinkCrawler(url, (linkList) => {
        linkList.forEach((link, i) => {
            download(link).pipe(bz2()).pipe(concat((data)=> {
                const filename = `${i}.grib2`;
                fs.writeFileSync(filename, data);
                grib2json.default(filename, {
                    data: true
                }, (err, json) => {
                    if (err) return console.log(err);
                    console.log(json[0].header.forecastTime);
                    // in this play i will write the function for pushing the data to mongodb
                    fs.unlink(filename, (err) => {
                        if (err) return console.log(err);
                    });
                });
            }));
        });
    });
};

module.exports = {DataCrawler};
