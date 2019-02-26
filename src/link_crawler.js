const rp = require('request-promise');
const cheerio = require('cheerio');

const LinkCrawler = (url, callback) => {
    rp(url).then((html) => {
        let $ = cheerio.load(html);
        let links = $('a');
        let linkList = [];
        $(links).each(function(i, link){
            linkList.push(url + $(link).attr('href'));
        });
        linkList.shift();
        callback(linkList);
    }).catch((err) => console.log(err));
};

const CheckTimestamp = (url, callback) => {
    rp(url).then((html) => {
        let $ = cheerio.load(html);
        let regex = /\d{1,2}-\w{3}-\d{4} \d{2}:\d{2}/;
        let timestamp = $('pre').text().match(regex)[0];
        let date = Date.parse(timestamp);
        callback(date);
    });
};

module.exports = {LinkCrawler, CheckTimestamp};