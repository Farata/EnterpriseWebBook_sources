var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title: 'Awesome Test Suite',

    hostPageUrl: '../index.html',
    loaderPath: {'SSC': '../app'},
    autoCheckGlobals: true,
    expectedGlobals: [ 'Ext', 'SSC', 'google', '__e3_', '_xdc_' ],

    preload: []
});

Harness.start(
    {
        group: 'My tests',
        items: [
            '010_sanity.t.js',
            '020_ssc_extjs_mvc.js'
        ]
    }
);