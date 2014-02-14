function NotOperation() {
    this.make = function (value) {
        return ['not', value];
    };

    this.execute = function (op, env) {
        return !env.execute(op[1]);
    };
}
