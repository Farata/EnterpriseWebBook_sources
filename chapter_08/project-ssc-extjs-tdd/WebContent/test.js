Ext.Loader.setConfig({
    disableCaching: false,
    enabled: true,
    paths: {
        Test: 'test',
        SSC: 'app'
    }
});

var Application = null;

Ext.onReady(function () {
    Application = Ext.create('Ext.app.Application', {
        name: 'SSC',
        requires: [
            'Test.spec.AllSpecs'
        ],
        controllers: [
            'Donate'
        ],
        launch: function () {
            Ext.create('Test.spec.AllSpecs');
            jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
            jasmine.getEnv().execute();
        }
    });
});

