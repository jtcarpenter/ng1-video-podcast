'use strict';

var PORT = 3000,
    CNN_URL = 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml',
    TED_URL = 'https://www.ted.com/talks/rss',
    request = require('request'),
    FeedParser = require('feedparser'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules'));

app.use('/api/', function(req, res) {

    var req = request(CNN_URL),
        feedparser = new FeedParser({feedurl: CNN_URL}),
        items = [];

    req.on('error', function (error) {
        console.log('req error', error);
    });

    req.on('response', function (res) {
        var stream = this;

        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

        stream.pipe(feedparser);
    });

    feedparser.on('error', function(error) {
        console.log('feedparser error', error);
    });

    feedparser.on('readable', function() {
        var stream = this,
            meta = this.meta,
            item;

        while (item = stream.read()) {
            items.push(item);
        }

    });

    feedparser.on('end', function(error) {
        if (error) {
            console.log(error, error.stack);
            res.json(error);
        }
        res.json({
            site: {
                title: this.meta.title,
                description: this.meta.description,
                date: this.meta.date,
                link: this.meta.link,
                author: this.meta.author,
            },
            items: items
        });
    });
});

app.listen(PORT, function() {
    console.log('listening on *:' + PORT);
});
