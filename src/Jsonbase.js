function Jsonbase(environment) {
    this.save = function () {
        localStorage.setItem(environment.name, environment.toJson(environment.file));
    };

    this.reload = function () {
        environment.file = environment.fromJson(localStorage.getItem(environment.name) || 'null');
    };

    this.environment = function () {
        return environment;
    };

    this.file = function () {
        return environment.file;
    };

    this.queryBuilder = function () {
        return environment.query_builder;
    };

    this.createTable = function (table_name) {
        environment.table.createTable(this.file(), table_name);
    };

    this.insert = function (table_name, record) {
        environment.table.insert(this.file(), table_name, record);
    };

    this.matches = function (table_name, values) {
        var qb = this.queryBuilder();

        var where = [];

        for (var i in values) {
            where.push(qb.eq(qb.get(i), qb.const(values[i])));
        }

        return qb.execute(qb.select(
            qb.table(table_name),
            qb.and(where)
        ));
    };
}

Jsonbase.Load = function (name) {
    var environment_factory = new EnvironmentFactory();
    var file = environment_factory.fromJson()(localStorage.getItem(name) || 'null');
    var environment = environment_factory.make(file);

    return new Jsonbase(environment);
};
