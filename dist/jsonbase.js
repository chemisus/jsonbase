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
            true: new TrueOperation()
        };
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
