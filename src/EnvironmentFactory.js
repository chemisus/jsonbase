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

        var environment = new Environment();

        environment.file = file;
        environment.operations = options.operations || this.makeOperations();
        environment.constraints = options.constraints || this.makeConstraints();
        environment.database = options.database || this.makeDatabase();
        environment.table = options.table || this.makeTable();
        environment.toJson = toJson;
        environment.fromJson = fromJson;
        environment.query_builder = this.makeQueryBuilder(environment);
        environment.record = null;
        environment.left = null;
        environment.right = null;
        environment.records = [];
        environment.lefts = [];
        environment.rights = [];

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
            path: new PathOperation(),
            like: new LikeOperation(),
            left: new LeftOperation(),
            right: new RightOperation(),
            join: new JoinOperation(),
            param: new ParameterOperation()
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
