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
}

Jsonbase.Load = function (name) {

    var environment_factory = new EnvironmentFactory();
    var file = JSON.parse(localStorage.getItem(name) || 'null');
    var environment = environment_factory.make(file);

    return new Jsonbase(environment);
};
