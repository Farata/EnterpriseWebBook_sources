(function ($) {
    'use strict';
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
         module(name, {[setup][ ,teardown]})
         test(name, callback)
         expect(numberOfAssertions)
         stop(increment)
         start(decrement)
     Test assertions:
         ok(value, [message])
         equal(actual, expected, [message])
         notEqual(actual, expected, [message])
         deepEqual(actual, expected, [message])
         notDeepEqual(actual, expected, [message])
         strictEqual(actual, expected, [message])
         notStrictEqual(actual, expected, [message])
         throws(block, [expected], [message])
     */
    /*module('You\'ll see me before each test', {
        setup: function () {
            console.log('\nin setup');
        }
    });*/

    test('jquery is here', function () {
        ok($, "yes, it's here");
    });

    test("2 add 2 equals 4", function () {
        ok(2 + 2 === 4, "Passed!");
    });

    test('2 add 2 not equals 5', function () {
        notEqual(2 + 2, 5, "failed");
    });

})(jQuery);