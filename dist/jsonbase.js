function Environment(ops) {
    this.execute = function (op) {
        return ops[op[0]].execute(op, this);
    };
}
;function EnvironmentFactory() {
    this.make = function () {
        return new Environment(
            this.makeOperations()
        );
    };

    this.makeOperations = function () {
        return {
            true: new TrueOperation(),
            false: new FalseOperation(),
            const: new ConstOperation()
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
