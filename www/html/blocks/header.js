'use strict';

/**
 * Generates HTML for the header space and nav. It takes link
 * in the format of 
 * ex: 
 * <!-- build:twittercard NavA,NavB;IdA,IdB --><!-- /build -->
 */
module.exports = function (processor) {
  processor.registerBlockType('header', function (content, block, blockLine, blockContent) {
  	let [,asset] = blockLine.match(RegExp(/build:\w*\s(.*)\s--><!--/));
  	asset = asset.split(';');
    let page = asset[0];
  	let nav = asset[1].split(',');
  	let hash = asset[2].split(',');
  	let str = '';
  	nav.forEach((nav, i) => str += '    <li><a href="#' + hash[i] + '">' + nav + '</a></li>\n    ');
  	let html = `
    	<!--  START nav.navbar.top-nav-collapse  -->
    	<nav id="main-navbar" class="navbar navbar-default scrolling-navbar .top-nav-collapse" data-spy="affix">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
              <a class="navbar-brand text-center" href="/"><object type="image/svg+xml" data="img/logo.svg" width="100%" height="100%"></object><span class="sr-only">The <abbr title="Filarmonica Artista Amadora de San Leandro">FAASL</abbr>, <abbr title="also known as">aka</abbr> the Portuguese Band of San Leandro</span></a> </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="main-navbar-collapse-1">
              <ul class="nav navbar-nav">
    			${str}
    		  </ul>
              <div class="nav navbar-nav navbar-right">
                <li><a href="http://subscribe.faasl.org" class="btn btn-donate" title="Go to our newsletter subscription page">Subscribe</a></li>
              </div>
    <!--
              <div class="nav navbar-nav navbar-right">
                <li><a href="http://help.faasl.org" class="btn btn-donate">Donate</a></li>
              </div>
    -->
            </div>
            <!-- /.navbar-collapse -->
          </div>
          <!-- /.container-fluid -->
        </nav>
        <!--  END nav.navbar.top-nav-collapse  -->
        <!--  START section#title-carousel  -->
        <section id="title-carousel" class="carousel-fluid slide" data-ride="carousel" data-interval="6000" data-pause="" data-keyboard="false">
          <div class="carousel-inner" role="listbox">
            <div class="item active"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </section>
        <!--  END section#title-carousel  -->
        <!--  START header#page-header  -->
        <header id="page-header" class="container-fluid">
          <div id="page-header-row" class="row">
            <h1 class="col-xs-12 text-center">
              <span class="h1">Portuguese Band</span><br>
              <small>of<br></small>
              <small>San Leandro</small>
            </h1>
            <div class="print-url">http://www.faasl.org</div>
          </div>
        </header>
    	<!--  END header#page-header  -->`;
    return content.replace(blockLine, html);
  });
};
