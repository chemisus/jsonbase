function Query(environment) {
    this.select = function (from, where) {
        return environment.operations.select.make(from, where);
    };

    this.table = function (name) {
        return environment.operations.table.make(name);
    };

    this.true = function () {
        return environment.operations.true.make();
    };

    this.execute = function (query) {
        return environment.operations[query[0]].execute(query, environment);
    };
}
