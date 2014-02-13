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

    this.queryBuilder = function () {
        return environment.query_builder;
    };

    this.createTable = function (name) {
        environment.table.addTable(environment.file, name);
    };
}

Jsonbase.Load = function (name) {

    var environment_factory = new EnvironmentFactory();
    var file = JSON.parse(localStorage.getItem(name) || 'null') || {
        constraints: {
            keys: [],
            values: {}
        },
        tables: {
            keys: [],
            values: {}
        }
    };
    var environment = environment_factory.make(file);

    return new Jsonbase(environment);
};
