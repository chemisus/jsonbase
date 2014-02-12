function LessThanOperation(operations) {
    this.execute = function (record, op) {
        return operations[op.lhs.op].execute(record, op.lhs) < operations[op.rhs.op].execute(record, op.rhs);
    };
}
