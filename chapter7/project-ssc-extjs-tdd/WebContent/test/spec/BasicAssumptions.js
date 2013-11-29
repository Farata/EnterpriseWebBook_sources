Ext.define("Test.spec.BasicAssumptions", {}, function () {
    "use strict";
    describe("Basic Assumptions: ", function () {
            it("Ext namespace should be available loaded", function () {
                expect(Ext).toBeDefined();
            });

            it("ExtJS 4.2 should be loaded", function () {
                expect(Ext.getVersion()).toBeTruthy();
                expect(Ext.getVersion().major).toEqual(4);
                expect(Ext.getVersion().minor).toEqual(2);
            });

            it("SSC code should be loaded", function () {
                expect(SSC).toBeDefined();
            });
            it("Donate controller should be loaded", function () {
                var controller = Application.getController("Donate");
                expect(controller).not.toBeUndefined();
            });
        }
    );
});
