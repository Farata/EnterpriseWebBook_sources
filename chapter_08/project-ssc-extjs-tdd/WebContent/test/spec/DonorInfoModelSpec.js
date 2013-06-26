Ext.define('Test.spec.DonorInfoModelSpec', {}, function () {
    describe('DonorInfo model', function () {
        var model;
        beforeEach(function () {
            model = Ext.create('SSC.model.DonorInfo', {});
        });
        afterEach(function () {
            Ext.data.Model.cache = {};
        });
        it('should exist', function () {
            expect(model.$className).toEqual('SSC.model.DonorInfo');
        });
        it('has properties', function () {
            var model = Ext.create('SSC.model.DonorInfo', {
                fullName: 'John Doe',
                email: 'john@doe.com',
                address: '200 West St.',
                city: 'NYC',
                zip: 123000,
                state: 'NY',
                country: 'US'
            });
            expect(model.get('fullName')).toEqual('John Doe');
            expect(model.get('email')).toEqual('john@doe.com');
            expect(model.get('address')).toEqual('200 West St.');
            expect(model.get('city')).toEqual('NYC');
            expect(model.get('zip')).toEqual(123000);
            expect(model.get('state')).toEqual('NY');
            expect(model.get('country')).toEqual('US');
        });
        it('has required valid email', function () {
            var model = Ext.create('SSC.model.DonorInfo');
            var validationResult = model.validate();
            expect(validationResult.isValid()).toBeFalsy();
            expect(validationResult.getByField('email')[0].message).toEqual('is not a valid email address');

            model.set('email', 'john@doe.com');
            expect(model.validate()).toBeTruthy();
        });

        // check existence of donate method
    });
});