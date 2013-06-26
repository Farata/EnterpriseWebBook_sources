Ext.define('Test.spec.DonorsStoreSpec', {}, function () {
    describe('Donors store', function () {
        it('should exist', function () {
            var store = Ext.create('SSC.store.Donors', {});
            expect(store.$className).toEqual('SSC.store.Donors');
        });

        it('backed ny Donor model', function () {
            var store = Ext.create('SSC.store.Donors', {});
            expect(store.model.$className).toEqual('SSC.model.Donor');
        });
    });
});