Ext.define("Test.spec.CampaignsStoreSpec", {}, function () {
    "use strict";
    describe("SSC.store.Campaigns store", function () {
        beforeEach(function () {
        });
        it("exists", function () {
            var store = Ext.create("SSC.store.Campaigns");
            expect(store.$className).toEqual("SSC.store.Campaigns");
        });
        it("backed by Campaign model", function () {
            var store = Ext.create("SSC.store.Campaigns");
            expect(store.model.$className).toEqual("SSC.model.Campaign");
        });
     /*   it("loaded with fake data", function () {
            Ext.ux.ajax.SimManager.init({
                delay: 300
            }).register({
                    "campaigns.json": {
                        stype: "json",  // use JsonSimlet (stype is like xtype for components)
                        data: [
                            {
                                "title": "title",
                                "description": "description",
                                "location": "location"
                            }
                        ]
                    }
                });
            var store = Ext.create("SSC.store.Campaigns");
            store.load();
            expect(store.data.items.length).toEqual(1);
        });*/
    });
});