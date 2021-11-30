const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const app = express();

const url = 'https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250';

axios(url).then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    let article = [];
    // $.html() return whole html of url page 
    $('.titleColumn a', html).each(function () {
        console.log($(this).text())
        article.push($(this).text())
        console.log('---------------')
    })

    const data = JSON.stringify(article);
    
    fs.writeFile('./config.json', data, function (err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        console.log('Configuration saved successfully.')
    });
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})