Ext.define('SSC.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: 'mainview',
            loginButton: 'button[action=login]',
            loginForm: 'loginform',
            cancelButton: 'loginform button[action=cancel]'
        },

        control: {
            loginButton: {
                tap: 'showLoginView'
            },
            cancelButton: {
                tap: 'cancelLogin'
            }
        }
    },

    showLoginView: function () {
        this.getMainView().setActiveItem(1);
    },

    cancelLogin: function () {
        this.getMainView().setActiveItem(0);
    }

});
