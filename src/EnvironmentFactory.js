function EnvironmentFactory() {
    this.make = function (file, options) {
        options = options || {};

        return {
            file: file,
            operations: options.operations || this.makeOperations(),
            constraints: options.constraints || this.makeConstraints(),
            database: options.database || this.makeDatabase(),
            table: options.table || this.makeTable()
        };
    };

    this.makeOperations = function () {
        return {
            select: new SelectOperation(),
            table: new TableOperation(),
            const: new ConstOperation(),
            get: new GetOperation(),
            eq: new EqualOperation(),
            or: new OrOperation(),
            and: new AndOperation(),
            not: new NotOperation(),
            true: new TrueOperation(),
            in: new InOperation(),
            path: new PathOperation()
        };
    };

    this.makeConstraints = function () {
    };

    this.makeDatabase = function () {
        return new Database();
    };

    this.makeTable = function () {
        return new Table();
    };
}
