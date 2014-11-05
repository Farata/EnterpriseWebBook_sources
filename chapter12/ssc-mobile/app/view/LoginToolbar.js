Ext.define('SSC.view.LoginToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'logintoolbar',

    config: {
        title: 'Save Sick Child',
        docked: 'top',

        items: [
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                action: 'login',
                text: 'Login'
            }
        ]
    }
});
