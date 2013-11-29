Ext.define("Test.spec.CampaignModelAssumptions", {}, function () {
    "use strict";
    beforeEach(function () {

    });

    afterEach(function () {
        Ext.data.Model.cache = {};
    });

    describe("SSC.model.Campaign model", function () {
        it("exists", function () {
            var model = Ext.create("SSC.model.Campaign", {});
            expect(model.$className).toEqual("SSC.model.Campaign");
        });
        it("has properties", function () {
            var model = Ext.create("SSC.model.Campaign", {
                title: "Donors meeting",
                description: "Donors meeting agenda",
                location: "New York City"
            });
            expect(model.get("title")).toEqual("Donors meeting");
            expect(model.get("description")).toEqual("Donors meeting agenda");
            expect(model.get("location")).toEqual("New York City");
        });
        it("property title has default values", function () {
            var model = Ext.create("SSC.model.Campaign");
            expect(model.get("title")).toEqual("Default Campaign Title");
        });
        it("requires campaign location", function () {
            var model = Ext.create("SSC.model.Campaign");
            var validationResult = model.validate();
            expect(validationResult.isValid()).toBeFalsy();

            expect(validationResult.getByField("location")[0].message).toEqual("must be present");
        });
    });

});
