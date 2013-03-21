chrome.extension.sendMessage({}, function() {
    'use strict';
    var readyStateCheckInterval = setInterval(function() {
        ["Left", "Top"].forEach(function(name, i) {
            var method = "scroll" + name;
            function isWindow( obj ) {
                return obj && typeof obj === "object" && "setInterval" in obj;
            }
            function getWindow( elem ) {
                return isWindow( elem ) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
            }
            $.fn[ method ] = function( val ) {
                var elem, win;
                if ( val === undefined ) {
                    elem = this[ 0 ];
                    if ( !elem ) {
                        return null;
                    }
                    win = getWindow( elem );
                    // Return the scroll offset
                    return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
                    win.document.documentElement[ method ] ||
                    win.document.body[ method ] :
                    elem[ method ];
                }
                    // Set the scroll offset
                this.each(function() {
                    win = getWindow( this );
                    if ( win ) {
                        var xCoord = !i ? val : $( win ).scrollLeft();
                        var yCoord = i ? val : $( win ).scrollTop();
                        win.scrollTo(xCoord, yCoord);
                    } else {
                        this[ method ] = val;
                    }
                });
            };
        });
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            var sidebar = $('#sidebar'),
            addSuscribe = $('.subscribe-fixed-top'),
            header = $('.navbar-fixed-top'),
            container = $('.container-fluid'),
            main = $('#main'),
            feedHeader = $('.static'),
            slide = main.find('.slide'),
            cssForHidding = {
                display: 'none'
            };
            sidebar.css(cssForHidding);
            addSuscribe.css(cssForHidding);
            header.css(cssForHidding);
            feedHeader.css(cssForHidding);
            container.css({top: 0});
            slide.css({top: 0});
            main.css({
                left: 0,
                width: '99%',
                marginLeft: '1%'
            });
            slide.on('scroll', function () {
                var position = slide.scrollTop();
                slide.scrollTop(position + 160);
            });
        }
    }, 10);
});