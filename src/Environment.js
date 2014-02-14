function Environment(ops) {
    this.execute = function (op) {
        return ops[op[0]].execute(op, this);
    };
}
