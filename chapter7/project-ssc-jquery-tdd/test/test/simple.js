'use strict';

test('jquery is here', function () {
    ok($, "yes, it's here");
});

test("2 add 2 equals 4", function () {
    ok(2 + 2 === 4, "Passed!");
});

test('2 add 2 not equals 5', function () {
    notEqual(2 + 2, 5, "failed");
});