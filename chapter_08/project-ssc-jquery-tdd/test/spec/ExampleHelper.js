beforeEach(function () {
    this.addMatchers({
        toBeSecretAgent: function () {
            var agentList = [
                "James Bond",
                "Ethan Hunt",
                "Jason Bourne",
                "Aaron Cross",
                "Jack Reacher"
            ];

            var actual = this.actual;
            this.message = function () {
                return actual + " is not a secret agent";
            };
            return agentList.indexOf(actual) !== -1;
        }
    });
});