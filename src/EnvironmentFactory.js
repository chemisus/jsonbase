function EnvironmentFactory(toJson, fromJson) {
    toJson = toJson || JSON.stringify;
    fromJson = fromJson || JSON.parse;

    this.toJson = function () {
        return toJson;
    };

    this.fromJson = function () {
        return fromJson;
    };

    this.make = function (file, options) {
        file = file || {
            constraints: {
                keys: [],
                values: {}
            },
            tables: {
                keys: [],
                values: {}
            }
        };

        options = options || {};

        var environment = {
            file: file,
            operations: options.operations || this.makeOperations(),
            constraints: options.constraints || this.makeConstraints(),
            database: options.database || this.makeDatabase(),
            table: options.table || this.makeTable(),
            toJson: toJson,
            fromJson: fromJson
        };

        environment.query_builder = this.makeQueryBuilder(environment);

        return environment;
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

    this.makeQueryBuilder = function (environment) {
        return new QueryBuilder(environment);
    };
}
