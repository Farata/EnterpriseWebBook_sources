Ext.define("SSC.view.VideoPanel", {
    extend: 'Ext.Component',
    xtype: 'videopanel',

    // As of v4.2 Ext JS doesn't have video component, so we use plain HTML markup.
    html: [
      '<video controls="controls" poster="resources/media/intro.jpg" width="390px" height="240px" preload="metadata">',
        '<source src="resources/media/intro.mp4" type="video/mp4"/>',
        '<source src="resources/media/intro.webm" type="video/webm"/>',
        '<p>Sorry, your browser doesn\'t support the video element</p>',
      '</video>'
    ]

});