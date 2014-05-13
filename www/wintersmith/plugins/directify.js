var __hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = function(env, callback) {

    /* Directify plugin. Defaults can be overridden in config.json
        e.g. "directify": {"directory": "directory"}
    */
    var defaults, Directify, directifyHTML, directory, key, options, value;
    defaults = {
        directory: 'directory'
    };
    options = env.config.directify || {};
    for (key in defaults) {
        value = defaults[key];
        if (options[key] == null) {
            options[key] = defaults[key];
        }
    }

    var fs = require('fs'),
        file = env.contentsPath + '/' + options.directory + '.json';
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
         
        directory = JSON.parse(data);
    });

    directifyHTML = function(html) {
        var _ = require('underscore'),
            rgx = /{directify{([^}]*)}}/gi,
            matches = [];

        if (!directory) {
            return callback(new Error("Cannot directifyHTML without directory"));
        }
        if (!html) {
            return callback(new Error("Cannot directifyHTML without HTML"));
        }

        matches = html.match(rgx);
        _.each(matches, function (match, i) {
            //"{directify{".length = 11 and "}}".length = 2
            var meat = match.substr(11, match.length - 13).split(':'),
                name = meat[0],
                data = meat[1],
                person = directory[name];

            info = person[data] || '{Error finding ' + data + ' for ' + name + '}';
            html = html.replace(match, info);
        });

        return html;
    };

    Directify = (function (_super) {
        __extends(Directify, _super);

        function Directify() {
            return Directify.__super__.constructor.apply(this, arguments);
        }

        Directify.prototype.getHtml = function () {
            return directifyHTML(Directify.__super__.getHtml.apply(this, arguments));
        }

        return Directify;

    })(env.plugins.MarkdownPage);

    env.registerContentPlugin('pages', '**/*.*(markdown|mkd|md)', Directify);

    env.helpers.directifyHTML = directifyHTML;

    return callback();
};
