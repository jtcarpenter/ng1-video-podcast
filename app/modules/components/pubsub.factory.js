(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('pubSub', pubSub);

    var events = {}

    /**
     * @name pubSub
     * @desc Simple publish subscribe service
     * used to share messages between the different components of the app
     * @return {Object}
     */
    function pubSub() {
        return {
            sub: sub,
            unSub: unSub,
            pub: pub
        }
    }

    /**
     * @name sub
     * @desc Method to subcrive to an named event
     * @param  {String} event Name of event
     * @param  {Function} onPub Callback to be called when event occurs
     * @return {void}
     */
    function sub(event, onPub) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(onPub);
    }

    /**
     * @name unSub
     * @desc Unsubscribe from an event
     * @param  {String} event Name of event to unsubscribe from
     * @param  {Function} onPub Callback to cancel
     * @return {void}
     */
    function unSub(event, onPub) {
        if (!events[event]) {
            return;
        }
        if (events[event].indexOf(onPub) !== -1) {
            events[event].splice(events[event].indexOf(onPub), 1);
        }
    }

    /**
     * @name pub
     * @desc Publish an event, calls all callbacks registered to this event
     * @param  {String} event Event name to publish
     * @param  {Array} args  Any arguments to pass to callback
     * @return {void}
     */
    function pub(event, args) {
        if (!events[event]) {
            console.error(event + 'does not exist');
            return;
        }
        for (var i = 0, l = events[event].length; i < l; i++) {
            events[event][i].apply(events[event][i], args, []);
        }
    }
})();
