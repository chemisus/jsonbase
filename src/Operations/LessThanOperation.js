function LessThanOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'lt',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, op, operations) {
        return operations[op.lhs.op].execute(record, op.lhs, operations) < operations[op.rhs.op].execute(record, op.rhs, operations);
    };
}