function QueryBuilder(environment) {
    this.select = function (from, where) {
        return environment.operations.select.make(from, where);
    };

    this.table = function (name) {
        return environment.operations.table.make(name);
    };

    this.get = function (value) {
        return environment.operations.get.make(value);
    };

    this.const = function (value) {
        return environment.operations.const.make(value);
    };

    this.eq = function (lhs, rhs) {
        return environment.operations.eq.make(lhs, rhs);
    };

    this.true = function () {
        return environment.operations.true.make();
    };

    this.execute = function (query) {
        return environment.operations[query[0]].execute(query, environment);
    };
}
