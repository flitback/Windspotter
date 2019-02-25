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
} 

module.exports = {LinkCrawler};