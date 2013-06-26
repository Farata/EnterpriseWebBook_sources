// also supports: startTest(function(t) {
StartTest(function (t) {
    t.diag("Sanity");

    t.ok(Ext, 'ExtJS is here');
    t.is(Ext.getVersion().major, 4, '... and it is version 4');
    t.is(Ext.getVersion().minor, 2, '... and it is version 4.2');

    t.ok(SSC, 'SaveSickChild project is here');
    t.ok(SSC.app.getController('Donate'), 'Donate controller is here as well');

    t.done();   // Optional, marks the correct exit point from the test
});