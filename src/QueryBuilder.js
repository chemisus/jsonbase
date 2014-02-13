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

    this.path = function (value) {
        return environment.operations.path.make(value);
    };

    this.const = function (value) {
        return environment.operations.const.make(value);
    };

    this.not = function (value) {
        return environment.operations.not.make(value);
    };

    this.eq = function (lhs, rhs) {
        return environment.operations.eq.make(lhs, rhs);
    };

    this.true = function () {
        return environment.operations.true.make();
    };

    this.param = function (value) {
        return environment.operations.param.make(value);
    };

    this.and = function (values) {
        return environment.operations.and.make(values);
    };

    this.or = function (values) {
        return environment.operations.or.make(values);
    };

    this.in = function (lhs, rhs) {
        return environment.operations.in.make(lhs, rhs);
    };

    this.like = function (lhs, rhs) {
        return environment.operations.like.make(lhs, rhs);
    };

    this.join = function (left, right, on, as) {
        return environment.operations.join.make(left, right, on, as);
    };

    this.left = function (value) {
        return environment.operations.left.make(value);
    };

    this.right = function (value) {
        return environment.operations.right.make(value);
    };

    this.execute = function (query) {
        return environment.operations[query[0]].execute(query, environment);
    };
}
