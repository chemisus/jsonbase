function Jsonbase(environment) {
    this.save = function () {
        localStorage.setItem(environment.name, environment.toJson(environment.file));
    };

    this.load = function () {
        environment.file = environment.fromJson(localStorage.getItem(environment.name) || 'null');
    };

    this.environment = function () {
        return environment;
    };

    this.queryBuilder = function () {
        return environment.query_builder;
    };
}
