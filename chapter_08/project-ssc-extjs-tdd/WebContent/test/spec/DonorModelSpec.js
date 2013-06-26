Ext.define('Test.spec.DonorModelSpec', {}, function () {
    describe("Donor model", function () {
        beforeEach(function () {
        });

        afterEach(function () {
            Ext.data.Model.cache = {};
        });
        it('should exist', function () {
            var model = Ext.create('SSC.model.Donor');
            expect(model.$className).toEqual('SSC.model.Donor');
        });
        it('has properties', function () {
            var model = Ext.create('SSC.model.Donor', {
                donors: 42,
                location: 'Newark'
            });
            expect(model.get('donors')).toEqual(42);
            expect(model.get('location')).toEqual('Newark');
        });
    });
});