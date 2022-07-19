'use strict';

/**
 * Generates HTML for a Twitter Card. Asset is a semicolon seperated string
 * in the format of title;description;pagename
 * ex: 
 * <!-- build:twittercard title;description;page --><!-- /build -->
 */
module.exports = function (processor) {
  processor.registerBlockType('twittercard', function (content, block, blockLine, blockContent) {
		let [,asset] = blockLine.match(RegExp(/build:\w*\s(.*)\s--><!--/));
		asset = asset.split(';');
		let html = `
		  <!-- Twitter Card -->
		  <meta name="twitter:card" content="summary_large_image">
		  <meta name="twitter:creator" content="@faasl">
		  <meta name="twitter:site" content="@faasl">
		  <meta name="twitter:title" content="${asset[0]}">
		  <meta name="twitter:description" content="${asset[1]}">
		  <meta name="twitter:image" content="http://www.faasl.org/img/social/${asset[2]}.jpg">`;
    let result = content.replace(blockLine, html);
    return result;
  });
};

// type:string
// attr:string
// targets:Array
// inline:boolean
// scoped:boolean
// asset:string
// indent:string
// raw:Array