(function ($) {
    describe("DOM manipulation spec", function () {
        var usernameInput;
        var passwordInput;

        beforeEach(function () {
            usernameInput = $(document.createElement("input")).attr({
                type: 'text',
                id: 'username',
                name: 'username',
                placeholder: "username",
                autocomplete: "off"})[0];

            // usernameInput = affix('input[id="username"][type="text"][name="username][placeholder="username"][autocomplete="off"]')[0];

            passwordInput = $(document.createElement("input")).attr({
                type: 'text',
                id: 'password',
                name: 'password',
                placeholder: "password",
                autocomplete: "off"})[0];
        });

        afterEach(function () {
        });

        it("jquey should be present", function () {
            expect($).not.toBeNull();
        });
        it("inputs should exist", function () {
            expect(usernameInput.id).toBe('username');
            expect(passwordInput.id).toBe('password');
        });
        it("should not allow login with empty username and password and return code equals 0", function () {
            var result = ssc.login(usernameInput, passwordInput);
            expect(result).toBe(0);
        });
        it("should allow login with user admin and password 1234 and return code equals 1", function () {
            usernameInput.value = "admin";
            passwordInput.value = "1234";
            var result = ssc.login(usernameInput, passwordInput);
            expect(result).toBe(1);
        });
    });
})(jQuery);