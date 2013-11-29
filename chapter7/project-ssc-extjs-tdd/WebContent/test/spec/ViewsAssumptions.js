Ext.define('Test.spec.ViewsAssumptions', {}, function () {
    // helper function for fixture DOM elements creation
    function prepareDOM(obj) {
        Ext.DomHelper.append(Ext.getBody(), obj);
    }

    describe('DonateForm ', function () {

        //reusable scoped variable
        var donateForm = null;

        //setup/teardown
        beforeEach(function () {
            // create fixture test div
            prepareDOM({tag: 'div', id: 'test-donate'});

            //create a fresh form for every test to avoid test pollution
            donateForm = Ext.create('SSC.view.DonateForm', {
                renderTo: 'test-donate'
            });
        });

        afterEach(function () {
            //destroy the form after every test so we don't pollute the environment
            donateForm.destroy();
            donateForm = null;
        });

        it('should inherit panel xtype', function () {
            expect(donateForm.isXType('panel')).toEqual(true);
        });
        it('should have donateform xtype', function () {
            expect(donateForm.isXType('donateform')).toEqual(true);
        });
    });

    describe('LoginBox', function () {
        var loginBox = null;
        beforeEach(function () {
            prepareDOM({tag: 'div', id: 'test-login'});
            loginBox = Ext.create('SSC.view.LoginBox', {
                renderTo: 'test-login'
            });

        });
        it('should do have loginbox xtype', function () {
            expect(loginBox.isXType('loginbox')).toEqual(true);
        });
        it('should have hbox layout', function () {
            expect(loginBox.getLayout().id).toContain('hbox');
        });

        afterEach(function () {
            loginBox.destroy();
            loginBox = null;
        });
    });
});