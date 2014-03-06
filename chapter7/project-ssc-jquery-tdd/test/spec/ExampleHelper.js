beforeEach(function () {
    'use strict';
    var customMatcher = {
        toBeSecretAgent: function () {
            return {
                compare: function (actual, expected) {
                    if (expected === undefined) {
                        expected = '';
                    }
                    var result = {};
                    var agentList = [
                        'James Bond',
                        'Ethan Hunt',
                        'Jason Bourne',
                        'Aaron Cross',
                        'Jack Reacher'
                    ];
                    result.pass = agentList.indexOf(actual) !== -1;
                    if (result.pass) {
                        result.message = actual + ' is a supper agent';
                    } else {
                        result.message = actual + ' is not a secret agent';
                    }
                    return result;
                }
            };
        }
    };

    jasmine.addMatchers(customMatcher);
});