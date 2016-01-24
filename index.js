'use strict';

var PORT = 3000,
    CNN_URL = 'http://rss.cnn.com/services/podcasting/{{feed}}/rss.xml',
    FEED = 'studentnews',
    request = require('request'),
    FeedParser = require('feedparser'),
    express = require('express'),
    app = express();

// Static routes for application assets
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules'));

// Route for feed ajax request
app.use('/api/', feed);

app.listen(PORT, function() {
    console.log('listening on *:' + PORT);
});

/**
 * @description             Get a CNN feed url
 * @param  {string} feed    name of
 * @return {string}         feed url
 */
function url(feed) {
    return CNN_URL.replace('{{feed}}', feed);
}

/**
 * @description    
 * @param  {object} req The request object
 * @param  {res}    res The response object
 * @return {void}
 */
function feed(req, res) {
    var feed = request(url(FEED)),
        feedparser = new FeedParser({feedurl: url(FEED)}),
        items = [];

    feed.on('error', onFeedError);
    feed.on('response', onFeedResponse);

    feedparser.on('error', onParseError);
    feedparser.on('readable', onParseReadable);
    feedparser.on('end', onParseEnd);

    /**
     * @desc   Log error requesting RSS feed
     * @return {boolean}
     */
    function onFeedError(error) {
        console.log('req error', error);
        res.status(404);
        res.json(error);
        return false;
    }

    /**
     * @desc   RSS request succeeded, pass response to parser
     * @param  {object} res
     */
    function onFeedResponse(res) {
        var stream = this;
        if (res.statusCode != 200) {
            return this.emit('error', new Error('Bad status code'));
        }
        stream.pipe(feedparser);
    }

    /**
     * @desc   Log parse error
     * @return {void}
     */
    function onParseError(error) {
        console.log('feedparser error', error);
        res.status(404);
        res.json(error);
        return;
    }

    /**
     * @desc   Parsed XML, reading items from stream
     * @return {void}
     */
    function onParseReadable() {
        var stream = this,
            meta = this.meta,
            item;

        while (item = stream.read()) {
            items.push(item);
        }
    }

    /**
     * @desc   Parse completed return JSON response  
     * @return {void}
     */
    function onParseEnd(error) {
        if (error) {
            console.log(error);
            res.status(404);
            res.json(error);
            return;
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
    }
}


