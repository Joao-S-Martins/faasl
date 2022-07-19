'use strict';

/**
 * Generates HTML to start the page.
 * ex: 
 * <!-- build:headblock index --><!-- /build -->
 */
module.exports = function (processor) {
  processor.registerBlockType('headblock', function (content, block, blockLine, blockContent) {
		var page = block.asset;
		var data = DICT[page];
		var html = ['<!doctype html>\n<html lang="en-us">\n<head>'];
		//  <!-- build:include:release tmpl/goog-anal.html.tmpl --><!-- /build -->
		html.push('  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');
	  html.push('  <title>' + data.title + '</title>');
	  html.push('  <!-- Favicon, generated at https://realfavicongenerator.net/favicon_result?file_id=p1c2l5eqs83itv5578dtaceve6#.WkhKTFQ-dBK -->');
	  html.push('  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">');
    html.push('  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">');
    html.push('  <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png">');
    html.push('  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">');
    html.push('  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">');
    html.push('  <link rel="manifest" href="/manifest.json">');
    html.push('  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#355749">');
    html.push('  <meta name="apple-mobile-web-app-title" content="FAASL">');
    html.push('  <meta name="application-name" content="FAASL">');
    html.push('  <meta name="msapplication-TileColor" content="#355749">');
    html.push('  <meta name="msapplication-TileImage" content="/mstile-144x144.png">');
    html.push('  <meta name="theme-color" content="#ffffff">\n');

    html.push('  <!-- Twitter Card -->');
		html.push('  <meta name="twitter:card" content="summary_large_image">');
		html.push('  <meta name="twitter:creator" content="@faasl">');
		html.push('  <meta name="twitter:site" content="@faasl">');
		html.push('  <meta name="twitter:title" content="' + data.title + '">');
		html.push('  <meta name="twitter:description" content="' + data.desc + '">');
		html.push('  <meta name="twitter:image" content="http://www.faasl.org/img/social/' + page + '.jpg">\n');

		html.push('  <!-- Social Open Graph -->');
	  html.push('  <meta name="og:url" content="http://www.faasl.org/' + page + '">');
	  html.push('  <meta name="og:type" content="website">');
	  html.push('  <meta name="og:title" content="' + data.title + '">');
	  html.push('  <meta name="og:description" content="' + data.desc + '">');
	  html.push('  <meta name="og:image" content="/img/social/' + page + '.jpg">\n');

		// html.push('  <!-- build:css:beta,release /css/styles.min.css -->');
		if (processor.options.environment === 'dev') {
			html.push('  <link href="node_modules/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">');
			html.push('  <link href="/css/faasl.css" rel="stylesheet" type="text/css">');
		} else {
			html.push('  <link href="/css/styles.min.css" rel="stylesheet" type="text/css">');
		}
		html.push('  <!-- /build -->');
		html.push('  <!--[if lt IE 9]>');
		html.push('    <link rel="stylesheet" type="text/css" href="css/ie9.css" />');
		html.push('  <![endif]-->');
		html.push('  <!--[if IE 9]>');
		html.push('    <link rel="stylesheet" type="text/css" href="css/ie9.css" />');
		html.push('  <![endif]-->');
		html.push('  <link rel="stylesheet" href="https://use.typekit.net/puk0cdd.css">');
		html.push('</head>');

    var result = content.replace(blockLine, html.join(block.indent + '\n'));
    return result;
  });
};

var DICT = {
	index: {
		desc: "We're committed to impacting lives through music education and mentorship.",
		title: "Portuguese Band of San Leandro - Filarmonica Artista Amadora de San Leandro"
	},
	remove: {
		desc: "We're committed to impacting lives through music education and mentorship.",
		title: "Portuguese Band of San Leandro - Filarmonica Artista Amadora de San Leandro"
	},
	students: {
		desc: "We're committed to impacting lives through music education and mentorship.",
		title: "Free Lessons - Portuguese Band of San Leandro - Filarmonica Artista Amadora de San Leandro"
	}
};
