Ext.define('SSC.view.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',
    requires: [
        'Ext.field.Password'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                title: 'Login',

                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        ui: 'decline',
                        action: 'cancel'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Please enter your credentials',

                defaults: {
                    labelWidth: '35%'
                },

                items: [
                    {
                        xtype: 'textfield',
                        label: 'Username'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password'
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Login',
                ui: 'confirm',
                margin: '0 10'
            }
        ]
    }
});
