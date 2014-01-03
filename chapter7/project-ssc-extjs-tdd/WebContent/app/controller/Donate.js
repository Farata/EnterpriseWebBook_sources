Ext.define('SSC.controller.Donate', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'donatePanel',
            selector: '[cls=donate-panel]'
        },
        {
            ref: 'usernameBox',
            selector: 'textfield[name=username]'
        },
        {
            ref: 'passwordBox',
            selector: 'textfield[name=password]'
        }
    ],

    init: function () {
        'use strict';

        this.control({
            'button[action=showform]': {
                click: this.showDonateForm
            },

            'button[action=hideform]': {
                click: this.hideDonateForm
            },

            'button[action=donate]': {
                click: this.submitDonateForm
            },

            'button[action=login]': {
                click: this.showLoginFields
            }
        });
    },

    showDonateForm: function () {
        this.getDonatePanel().getLayout().setActiveItem(1);
    },

    hideDonateForm: function () {
        this.getDonatePanel().getLayout().setActiveItem(0);
    },

    submitDonateForm: function () {
        var form = this.getDonatePanel().down('form');

        if (form.isValid()) {
            var donorInfo = this.newDonorInfo();
            Ext.iterate(form.getValues(), function (key, value) {
                donorInfo.set(key, value);
            }, this);
            donorInfo.donate();
        }
    },

    showLoginFields: function () {
        this.getUsernameBox().show();
        this.getPasswordBox().show();
    },
    newDonorInfo: function () {
        return Ext.create('SSC.model.DonorInfo', {});
    }

});
