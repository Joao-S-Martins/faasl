var __hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = function(env, callback) {

    /* eventHelpers plugin. Defaults can be overridden in config.json
        e.g. "events": {"fundraisers": "fundraisers"}
    */
    var _ = require('underscore'),
        moment = require('moment'),
        eventlist, defaults, key, options, value, fundraisers, performances;
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

    fundraisers = env.contentsPath + '/' + options.fundraisers + '.json';
    performances = env.contentsPath + '/' + options.performances + '.json';
    fundraisers = env.helpers.utils.readJSONSync(fundraisers).events;
    performances = env.helpers.utils.readJSONSync(performances).events;

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

    function getPerformances(fromToday, max) {
        return _getList(performances, fromToday, max);
    }

    function getFundraisers(fromToday, max) {
        return _getList(fundraisers, fromToday, max);
    }

    function getAll(fromToday, max) {
        if (!eventlist) {
            _combineEvents();
        }
        return _getList(eventlist, fromToday, max);
    }

    EventsPage = (function(_super) {
        env.helpers.utils.__extends(EventsPage, _super);

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
        return callback(null, {'events.page': new EventsPage(getAll())});
    });

    env.helpers.events = {
        getPerformances: getPerformances,
        getFundraisers: getFundraisers,
        getAll: getAll
    };

    return callback();
};
