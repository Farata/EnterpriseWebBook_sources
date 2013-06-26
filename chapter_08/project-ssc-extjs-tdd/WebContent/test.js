Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true,
    paths: {
        Test: 'test',
        SSC: 'app'
    }
});

var Application = null;

Ext.require([
    'Ext.ux.ajax.SimManager'
]);

Ext.onReady(function () {
    Application = Ext.create('Ext.app.Application', {
        name: 'SSC',
        requires: [
            'Test.spec.AllSpecs'
        ],
        controllers: [
            'Donate'
        ],
        initJasmine: function () {
            var jasmineEnv = jasmine.getEnv();

            /*var jsApiReporter = new jasmine.JsApiReporter();
             var htmlReporter = new jasmine.HtmlReporter();*/

            //jasmineEnv.addReporter(jsApiReporter);
            //jasmineEnv.addReporter(htmlReporter);

            /*jasmineEnv.specFilter = function (spec) {
             return htmlReporter.specFilter(spec);
             };*/

            jasmineEnv.execute();
        },
        launch: function () {
            this.initJasmine();

            Ext.create('Test.spec.AllSpecs');
        }
    });
})
;