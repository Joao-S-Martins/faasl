var __hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = function(env, callback) {

    /* eventHelpers plugin. Defaults can be overridden in config.json
        e.g. "events": {"fundraisers": "fundraisers"}
    */
    var defaults, key, options, value;
    defaults = {
        fundraisers: 'fundraisers',
        performances: 'performances',
        page: 'events.html',
        template: 'events.jade'
    };
    options = env.config.directify || {};
    for (key in defaults) {
        value = defaults[key];
        if (options[key] == null) {
            options[key] = defaults[key];
        }
    }

    var _ = require('underscore'),
        moment = require('moment'),
        fs = require('fs'),
        eventlist,
        fundraisers = env.contentsPath + '/' + options.fundraisers + '.json',
        performances = env.contentsPath + '/' + options.performances + '.json';
    fs.readFile(fundraisers, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        fundraisers = JSON.parse(data).events;
        fundraisers.sort(sortFn);
    });
    fs.readFile(performances, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        performances = JSON.parse(data).events;
        performances.sort(sortFn);
    });
    // env.util.readJSONSync(filename)

    function sortFn(a, b) {
        return moment(a.time) - moment(b.time);
    }

    function filterFn(event) {
        return (moment(event.time) > moment()) ? true : false;
    }

    function _combineEvents() {
        eventlist = fundraisers.concat(performances);
        eventlist.sort(sortFn);
    }

    function _getList(list, fromToday, max) {
        var retval = list;
        if (fromToday) {
            retval = _.filter(retval, filterFn);
        }
        if (max) {
            retval = retval.slice(0, Math.min(max, retval.length));
        }
        return retval;
    }

    function _fundraiserNote(event) {
        var mmt = moment(event.time),
            retval = ['<h5>', event.description, '</h5>',
            '<p>',
            mmt.format('dddd, MMMM Do') + '<br>',
            mmt.format('h:mm a') + '<br>',
            event.street + ', ' + event.city,
            '</p>'];

        return retval.join('');
    }

    function getPerformances(fromToday, max) {
        return _getList(performances, fromToday, max);
    }

    function getFundraisers(fromToday, max) {
        return _getList(fundraisers, fromToday, max);
    }

    function allEvents(fromToday, max) {
        if (!eventlist) {
            _combineEvents();
        }
        return _getList(eventlist, fromToday, max);
    }

    function upcomingPerformanceList() {
        var events = getPerformances(true, 8),
            retval = '';
        _.each(events, function (e) {
            //May 16, Hayward, 6:30PM<br>
            var mmt = moment(e.time);
            var date = mmt.format("MMMM D");
            var time = (mmt.hour() === 0 && mmt.minute() === 0) ?
                    'TBD' : mmt.format("h:mm a");
            retval += [date, e.city, time].join(', ') + '<br>';
        });
        retval = '<p>' + retval + '</p>';
        retval = '<h3>Upcoming Performances</h3>' + retval;
        return retval;
    }

    env.helpers.events = {
        getPerformances: getPerformances,
        getFundraisers: getFundraisers,
        allEvents: allEvents,
        upcomingPerformanceList: upcomingPerformanceList,
        fundraiserNote: _fundraiserNote
    };

    EventsPage = (function(_super) {
        __extends(EventsPage, _super);

        /* An EventsPage has a list of events */

        function EventsPage(events) {
            this.events = events;
        }

        EventsPage.prototype.getFilename = function() {
            return options.page;
        };

        EventsPage.prototype.getView = function() {
            return function(env, locals, contents, templates, callback) {
                var ctx, template;
                template = templates[options.template];
                if (template == null) {
                  return callback(new Error("unknown events template '" + options.template + "'"));
                }
                ctx = {
                  env: env,
                  contents: contents,
                  events: this.events
                };
                env.utils.extend(ctx, locals);
                return template.render(ctx, callback);
            };
        };

        return EventsPage;
    })(env.plugins.Page);

    env.registerGenerator('events', function(contents, callback) {
        return callback(null, {'events.page': new EventsPage(allEvents())});
    });

    return callback();
};
