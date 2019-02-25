const {DataCrawler} = require('./src/data_crawler');

const folderurl = 'https://opendata.dwd.de/weather/nwp/icon-eu/grib/';
const times = ['00', '03', '06', '09', '12', '15', '18', '21'];
const forecastTypes = ['t_2m', 'u_10m', 'v_10m', 'vmax_10m', 'clct'];
const url = folderurl + times[0] + '/' + forecastTypes[0] + '/';

DataCrawler(url);
