Ext.define("Test.spec.DonateControllerSpec", {}, function () {
    describe("Donate controller", function () {
        beforeEach(function () {
        });
        it('should exists', function () {
            var controller = Ext.create('SSC.controller.Donate');
            expect(controller.$className).toEqual('SSC.controller.Donate');
        });
        describe('donateButton - button[action=donate]', function () {
            it('calls donate on DonorInfo if form is valid', function () {
                var donorInfo = Ext.create('SSC.model.DonorInfo', {});
                var donateForm = Ext.create('SSC.view.DonateForm', {});
                var controller = Ext.create('SSC.controller.Donate');
                spyOn(donorInfo, 'donate');
                spyOn(controller, 'getDonatePanel').and.callFake(function () {
                    donateForm.down = function () {
                        return {
                            isValid: function () {
                                return true;
                            },
                            getValues: function () {
                                return {};
                            }
                        };
                    };
                    return donateForm;
                });
                spyOn(controller, 'newDonorInfo').and.callFake(function () {
                    return donorInfo;
                });
                controller.submitDonateForm();
                expect(donorInfo.donate).toHaveBeenCalled();
            });
        });
    });
});