function EqualOperation() {
    this.make = function (lhs, rhs) {
        return ['eq', lhs, rhs];
    };

    this.execute = function (op, env) {
        var lhs = env.execute(op[1]);
        var rhs = env.execute(op[2]);

        return lhs == rhs;
    };
}
