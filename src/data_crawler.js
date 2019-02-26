const download = require('download');
const bz2 = require('unbzip2-stream');
const grib2json = require('grib2json');
const concat = require('concat-stream');
const fs = require('fs');

const {LinkCrawler} = require('./../src/link_crawler');
const {ForecastJSON} = require('./../server/models/forecastJSON');

const DataCrawler = (url, forecastType) => {
    //check if Data is allready in DB to be implemented
    LinkCrawler(url, (linkList) => {
        linkList.forEach((link, i) => {
            download(link).pipe(bz2()).pipe(concat((data)=> {
                const filename = `${i}.grib2`;
                fs.writeFileSync(filename, data);
                grib2json.default(filename, {
                    data: true
                }, (err, json) => {
                    if (err) return console.log(err);

                    let refTimestamp = Date.parse(json[0].header.refTime);
                    let forecastTime = refTimestamp + (json[0].header.forecastTime * 60 * 1000);

                    ForecastJSON.find({
                        forecastType,
                        forecastTime
                    }).then((res) => {
                        if (res[0]) {
                            // ForecastJSON.findByIdAndUpdate(res[0]._id , {
                            //     forecastType,
                            //     refTimestamp,
                            //     header: json[0].header,
                            //     data: json[0].data
                            // }, (err, res) => {
                            //     if (err) {console.log(err)}
                            //     console.log('added', res.forecastType);
                            // });
                        } else {
                            let JSONForecast = new ForecastJSON({
                                forecastType,
                                forecastTime,
                                refTimestamp,
                                header: json[0].header,
                                data: json[0].data})
                            JSONForecast.save((err, doc) => {
                                if (err) return console.error(err);
                                console.log(doc.forecastType + ' ' + json[0].header.forecastTime + ' saved to the database');
                            });
                        }
                        
                    });
                    fs.unlink(filename, (err) => {
                        if (err) return console.log(err);
                    });
                });
            }));
        });
    });
};

module.exports = {DataCrawler};
