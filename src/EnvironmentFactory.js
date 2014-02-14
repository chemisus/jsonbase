function EnvironmentFactory() {
    this.make = function () {
        return new Environment(
            this.makeOperations()
        );
    };

    this.makeOperations = function () {
        return {
            true: new TrueOperation()
        };
    };
}
