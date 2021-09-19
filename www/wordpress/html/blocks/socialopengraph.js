'use strict';

/**
 * Generates HTML for Social Open Graph (Facebook & Google). Asset is a semicolon seperated string
 * in the format of title;description;pagename
 * ex: 
 * <!-- build:socialopengraph title;description;page --><!-- /build -->
 */
module.exports = function (processor) {
  processor.registerBlockType('socialopengraph', function (content, block, blockLine, blockContent) {
    let [,asset] = blockLine.match(RegExp(/build:\w*\s(.*)\s--><!--/));
    asset = asset.split(';');
    let html = `
      <!-- Social Open Graph -->
      <meta name="og:url" content="http://www.faasl.org/${asset[2]}">
      <meta name="og:type" content="website">
      <meta name="og:title" content="${asset[0]}">
      <meta name="og:description" content=${asset[1]}">
      <meta name="og:image" content="/img/social/${asset[2]}.jpg">`;
    let result = content.replace(blockLine, html);
    return result;
  });
};