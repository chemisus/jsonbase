function Environment(ops) {
    this.execute = function (op) {
        return ops[op[0]].execute(op, this);
    };
}
;function EnvironmentFactory() {
    this.make = function (options) {
        options = options || {};

        return new Environment(
            options.operations || this.makeOperations()
        );
    };

    this.makeOperations = function () {
        return {
            true: new TrueOperation(),
            false: new FalseOperation(),
            const: new ConstOperation(),
            eq: new EqualOperation()
        };
    };
}
;function ConstOperation() {
    this.make = function (value) {
        return ['const', value];
    };

    this.execute = function (op, env) {
        return op[1];
    };
}
;function EqualOperation() {
    this.make = function (lhs, rhs) {
        return ['eq', lhs, rhs];
    };

    this.execute = function (op, env) {
        var lhs = env.execute(op[1]);
        var rhs = env.execute(op[2]);

        return lhs == rhs;
    };
}
;function FalseOperation() {
    this.make = function () {
        return ['false'];
    };

    this.execute = function (op, env) {
        return false;
    };
}
;function TrueOperation() {
    this.make = function () {
        return ['true'];
    };

    this.execute = function (op, env) {
        return true;
    };
}
