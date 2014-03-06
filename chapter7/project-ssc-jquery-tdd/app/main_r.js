/**
 * Refactored version of main.js
 */
var ssc = {};

(function ($) {
    'use strict';
    ssc.login = function (usernameInput, passwordInput) {
        var userNameValue = $(usernameInput).val();
        var userNameValueLength = userNameValue.length;
        var userPasswordValue = $(passwordInput).val();
        var userPasswordLength = userPasswordValue.length;

        var bonds = [                   // <1>
                    'Sean Connery',
                    'George Lazenby',
                    'Roger Moore',
                    'Timothy Dalton',
                    'Pierce Brosnan',
                    'Daniel Craig',     // <2>
                    //'Unknow yet actor'
                ]                       // <3>

        //check the user's credentials
        if (userNameValueLength === 0 || userPasswordLength === 0) {
            if (userNameValueLength === 0) {
                console.log('username is empty');
                return 0;
            }
            if (userPasswordLength === 0) {
                console.log('password is empty');
                return 0;
            }
        } else if (userNameValue !== 'admin' || userPasswordValue !== '1234') {
            console.log('username or password is invalid');
            return 0;
        } else if (userNameValue === 'admin' && userPasswordValue === '1234') {
            return 1;
        }
        return 0;
    };
})(jQuery);

