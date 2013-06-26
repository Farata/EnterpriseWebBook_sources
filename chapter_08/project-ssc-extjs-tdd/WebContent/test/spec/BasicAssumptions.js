Ext.define('Test.spec.BasicAssumptions', {}, function () {
    describe("Basic Assumptions:", function () {

            it("Ext namespace should be available loaded", function () {
                expect(Ext).toBeDefined();
            });

            it("ExtJS 4.2 should be loaded", function () {
                expect(Ext.getVersion()).toBeTruthy();
                expect(Ext.getVersion().major).toEqual(4);
                expect(Ext.getVersion().minor).toEqual(2);
            });

            it("has loaded SSC code", function () {
                expect(SSC).toBeDefined();
            });
        }
    );
});
