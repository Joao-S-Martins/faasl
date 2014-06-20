module.exports = function(env, callback) {

    /* Homepage plugin. Defaults can be overridden in config.json
        e.g. "homepage": {"itemsMain": "main"}
    */
    var homePage, defaults, getHomeItems, key, options, value;
    defaults = {
        template: 'index.jade',
        itemsDirectory: 'homeitems',
        itemsMain: 'index',
        filename: 'index.html'
    };
    options = env.config.homepage || {};
    for (key in defaults) {
        value = defaults[key];
        if (options[key] == null) {
            options[key] = defaults[key];
        }
    }

    getHomeItems = function(contents) {
        var items,
            _ = require('underscore'),
            moment = require('moment');
        contents = contents[options.itemsDirectory];

        items = contents._.directories.map(function(item) {
            return item[options.itemsMain];
        });
        items = _.filter(items, function(item) {
            if (typeof(item) === 'undefined') {
                return false;
            }

            var now = moment(),
                date = moment(item.date),
                expires = moment(item.metadata.expires),
                preview = item.metadata.preview;

            switch (true) {
                case preview && env.mode === 'preview':
                    return true;
                case date > now || expires < now:
                    return false;
                default:
                    return true;
            }
        });
        items.sort(function(a, b) {
            return a.date - b.date;
        });
        return items;
    };

    homePage = (function(_super) {
        env.helpers.utils.__extends(homePage, _super);

        /* A homePage has a list of items */

        function homePage(items) {
            this.items = items;
        }

        homePage.prototype.getFilename = function() {
            return options.filename;
        };

        homePage.prototype.getView = function() {
            return function(env, locals, contents, templates, callback) {
                var ctx, template;
                template = templates[options.template];
                if (template == null) {
                    return callback(new Error("unknown homepage template '" + options.template + "'"));
                }

                ctx = {
                    env: env,
                    contents: contents,
                    homeItems: this.items
                };
                env.utils.extend(ctx, locals);
                return template.render(ctx, callback);
            };
        };

    return homePage;

    })(env.plugins.Page);

    env.registerGenerator('homepage', function(contents, callback) {
        return callback(null, {
            "index.page": new homePage(getHomeItems(contents))
        });
    });

    env.helpers.getHomeItems = getHomeItems;

    return callback();
};
