'use strict';

var PORT = 3000,
    FEED = 'http://rss.cnn.com/services/podcasting/amanpour/rss',
    request = require('request'),
    parser = require('node-feedparser'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules'));

app.use('/api/', function(req, res) {
    request(FEED, function(error, resp, body) {
        parser(body, function(error, ret) {
            res.json(ret);
        });
    });
});

app.listen(PORT, function() {
    console.log('listening on *:' + PORT);
});
