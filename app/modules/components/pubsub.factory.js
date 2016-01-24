/**
 * pubSub Factory
 * @namespace Factories
 */
(function() {
    'use strict';

    angular
        .module('vpod.components')
        .factory('pubSub', pubSub);

    var events = {}

    function sub(event, onPub) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(onPub);
    }

    function unSub(event, onPub) {
        if (!events[event]) {
            return;
        }
        if (events[event].indexOf(onPub) !== -1) {
            events[event].splice(events[event].indexOf(onPub), 1);
        }
    }

    function pub(event, args) {
        if (!events[event]) {
            console.error(event + 'does not exist');
            return;
        }
        for (var i = 0, l = events[event].length; i < l; i++) {
            events[event][i].apply(events[event][i], args, []);
        }
    }

    function pubSub() {
        return {
            sub: sub,
            unSub: unSub,
            pub: pub
        }
    }
})();
