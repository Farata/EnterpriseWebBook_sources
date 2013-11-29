Ext.define("SSC.view.LoginBox", {
    extend: 'Ext.Container',
    xtype: 'loginbox',

    layout: 'hbox',

    items: [{
        xtype: 'container',
        flex: 1
    }, {
        xtype: 'textfield',
        emptyText: 'username',
        name: 'username',
        hidden: true
    }, {
        xtype: 'textfield',
        emptyText: 'password',
        inputType: 'password',
        name: 'password',
        hidden: true
    }, {
        xtype: 'button',
        text: 'Login',
        action: 'login'
    }]
});