function EnvironmentFactory() {
    this.make = function (options) {
        options = options || {};

        return new Environment(
            options.operations || this.makeOperations()
        );
    };

    this.makeOperations = function () {
        return {
            true: new TrueOperation(),
            false: new FalseOperation(),
            const: new ConstOperation(),
            eq: new EqualOperation()
        };
    };
}
