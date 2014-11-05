Ext.define('SSC.view.DonateForm', {
    extend: 'Ext.form.Panel',
    xtype: 'donateform',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.field.Number',
        'Ext.field.Radio',
        'Ext.field.Email',
        'Ext.field.Hidden',
        'Ext.SegmentedButton',
        'Ext.Label'
    ],

    config: {
        title: 'DonateForm',

        control: {
            'segmentedbutton': {
                toggle: 'onAmountButtonChange'
            },
            'numberfield[name=amount]': {
                change: 'onAmountFieldChange'
            }
        },

        items: [
            {
                xtype: 'label',
                cls: 'x-form-fieldset-title',
                html: 'Please select donation amount:'
            },
            {
                xtype: 'segmentedbutton',
                margin: '0 10',

                defaults: {
                    flex: 1
                },

                items: [
                    {
                        text: '$10',
                        data: {
                            value: 10
                        }
                    },
                    {
                        text: '$20',
                        data: {
                            value: 20
                        }
                    },
                    {
                        text: '$50',
                        data: {
                            value: 50
                        }
                    },
                    {
                        text: '$100',
                        data: {
                            value: 100
                        }
                    }
                ]
            },
            {
                xtype: 'hiddenfield',
                name: 'amount'
            },
            {
                xtype: 'fieldset',
                title: '... or enter other amount',

                items: [
                    {
                        xtype: 'numberfield',
                        label: 'Amount',
                        name: 'amount'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Donor information',

                items: [
                    {
                        name: 'fullName',
                        xtype: 'textfield',
                        label: 'Full name'
                    },
                    {
                        name: 'email',
                        xtype: 'emailfield',
                        label: 'Email'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Location',

                items: [
                    {
                        name: 'address',
                        xtype: 'textfield',
                        label: 'Address'
                    },
                    {
                        name: 'city',
                        xtype: 'textfield',
                        label: 'City'
                    },
                    {
                        name: 'zip',
                        xtype: 'textfield',
                        label: 'Zip'
                    },
                    {
                        name: 'state',
                        xtype: 'selectfield',
                        autoSelect: false,
                        label: 'State',
                        store: 'States',
                        valueField: 'id',
                        displayField: 'name'
                    },
                    {
                        name: 'country',
                        xtype: 'selectfield',
                        autoSelect: false,
                        label: 'Country',
                        store: 'Countries',
                        valueField: 'id',
                        displayField: 'name'
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Donate',
                ui: 'confirm',
                margin: '0 10 20'
            }
        ]
    },

    onAmountButtonChange: function (segButton, button, isPressed) {
        if (isPressed) {
            this.clearAmountField();
            this.updateHiddenAmountField(button.getData().value);
            button.setUi('confirm');
        }
        else {
            button.setUi('normal');
        }
    },

    onAmountFieldChange: function () {
        this.depressAmountButtons();
        this.clearHiddenAmountField();
    },

    clearAmountField: function () {
        var amountField = this.down('numberfield[name=amount]');
        amountField.suspendEvents();
        amountField.setValue(null);
        amountField.resumeEvents(true);
    },

    updateHiddenAmountField: function (value) {
        this.down('hiddenfield[name=amount]').setValue(value);
    },

    depressAmountButtons: function () {
        this.down('segmentedbutton').setPressedButtons([]);
    },

    clearHiddenAmountField: function () {
        this.updateHiddenAmountField(null);
    }
});