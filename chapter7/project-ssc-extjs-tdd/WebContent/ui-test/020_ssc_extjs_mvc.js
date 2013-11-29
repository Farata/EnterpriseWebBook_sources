StartTest(function (t) {

    t.diag("Loading classes on demand and verifying they were indeed loaded.");

    t.ok(Ext, 'ExtJS is here');

    t.requireOk('SSC.controller.Donate');
    t.requireOk('SSC.store.Campaigns');
    t.requireOk('SSC.store.Donors');
    t.requireOk('SSC.view.CampaignsMap');
    t.requireOk('SSC.view.DonateForm');
    t.requireOk('SSC.view.DonorsPanel');
    t.requireOk('SSC.view.Header');
    t.requireOk('SSC.view.LoginBox');
    t.requireOk('SSC.view.VideoPanel');
    t.requireOk('SSC.view.Viewport');

});