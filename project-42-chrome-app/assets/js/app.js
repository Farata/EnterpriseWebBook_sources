var configuration;

configuration = {
    paths: {
        'login': 'modules/login',
        'donation': 'modules/donation',
        'svg-pie-chart': 'modules/svg-pie-chart',
        'campaigns-map': 'modules/campaigns-map',
        'showHideDiv': 'modules/utils/show-hide-div',
        'loadHtmlContent': 'modules/utils/load-html-content',
        'newContentLoader': 'modules/utils/new-content-loader',
        'who-we-are': 'modules/who-we-are',
        'what-we-do': 'modules/what-we-do',
        'where-we-work': 'modules/where-we-work',
        'way-to-give': 'modules/way-to-give'
    },
    shim: {
        'campaigns-map': {
            deps: ['async!http://maps.google.com/maps/api/js?sensor=false!callback']
        }
    }
};

/*
 'order!showHideDiv',
 'order!loadHtmlContent',
 'order!newContentLoader',
 'order!who-we-are',
 'order!what-we-do',
 'order!where-we-work',
 'order!way-to-give'
 */


require(configuration, ['order!login', 'order!donation', 'order!campaigns-map', 'order!svg-pie-chart'], function () {
    console.log("app is loaded");
    return (function () {
        var lazyLoadingEventHandlerFactory, wayToGiveHandleClick, wayToGiveModule, way_to_give, whatWeDoHandleClick, whatWeDoModule, what_we_do, whereWeWorkHandleClick, whereWeWorkModule, where_we_work, whoWeAreHandleClick, whoWeAreModule, who_we_are;
        way_to_give = document.getElementById("way-to-give");
        what_we_do = document.getElementById("what-we-do");
        who_we_are = document.getElementById("who-we-are");
        where_we_work = document.getElementById("where-we-work");
        wayToGiveModule = null;
        whatWeDoModule = null;
        whoWeAreModule = null;
        whereWeWorkModule = null;
        lazyLoadingEventHandlerFactory = function (module, modulePath) {
            var clickEventHandler;
            clickEventHandler = function (event) {
                if (module === "loading") {
                    return;
                }
                if (module !== null) {
                    return module.render();
                } else {
                    module = "loading";
                    return require([modulePath], function (moduleObject) {
                        module = new moduleObject();
                        return module.render();
                    });
                }
            };
            return clickEventHandler;
        };
        wayToGiveHandleClick = lazyLoadingEventHandlerFactory(wayToGiveModule, "modules/way-to-give");
        whatWeDoHandleClick = lazyLoadingEventHandlerFactory(whatWeDoModule, "modules/what-we-do");
        whoWeAreHandleClick = lazyLoadingEventHandlerFactory(whoWeAreModule, "modules/who-we-are");
        whereWeWorkHandleClick = lazyLoadingEventHandlerFactory(whereWeWorkModule, "modules/where-we-work");
        way_to_give.addEventListener("click", wayToGiveHandleClick, false);
        what_we_do.addEventListener("click", whatWeDoHandleClick, false);
        who_we_are.addEventListener("click", whoWeAreHandleClick, false);
        where_we_work.addEventListener("click", whereWeWorkHandleClick, false);
    })();
});
