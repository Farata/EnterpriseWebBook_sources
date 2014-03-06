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
        launch: function () {
            Ext.create('Test.spec.AllSpecs');
        }
    });
})
;