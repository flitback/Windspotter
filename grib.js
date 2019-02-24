const fs = require('fs');
const download = require('download');
const bz2 = require('unbzip2-stream');
const concat = require('concat-stream');
const grib2json = require('grib2json');

var filepath = 'https://opendata.dwd.de/weather/nwp/icon-eu/grib/03/t_2m/icon-eu_europe_regular-lat-lon_single-level_2019022403_000_T_2M.grib2.bz2';
var filename = 'b.grib2';

download(filepath).pipe(bz2()).pipe(concat((data)=> {
    fs.writeFileSync(filename, data);
    grib2json.default(filename, {
        data: true
    }, (err, json) => {
        if (err) return console.log(err);
        console.log(json[0].data)
        fs.unlink(filename, (err) => {
            if (err) return console.log(err);
        });
    });
}));

