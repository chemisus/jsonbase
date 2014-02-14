function EnvironmentFactory() {
    this.make = function (options) {
        options = options || {};

        return new Environment(
            options.operations || this.makeOperations(),
            options.query_builder_factory || new QueryBuilderFactory()
        );
    };

    this.makeOperations = function () {
        return {
            true: new TrueOperation(),
            false: new FalseOperation(),
            const: new ConstOperation(),
            not: new NotOperation(),
            record: new RecordOperation(),
            map: new MapOperation(),
            eq: new EqualOperation()
        };
    };
}
