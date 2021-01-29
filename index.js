const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/', function(req, res){
url="https://time.com";
 
request(url, function(error, response, html) {
  
  if (!error) {
    
    var $ = cheerio.load(html);
    pageURLs = [];
    
    $('ol.swipe-h a').map(function (i, links) {
      var articleLink = url+$(links).attr('href');
      var title=$(links).text();

      pageURLs.push({
      title:title,  
      link: articleLink   
    });
    });
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(pageURLs));
  }
});
});

app.listen('8080');
console.log('API is running on http://localhost:8080');
module.exports = app;