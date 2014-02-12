function LessThanOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'lt',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, current, operations) {
        return operations[current.lhs.op].execute(record, current.lhs, operations) < operations[current.rhs.op].execute(record, current.rhs, operations);
    };
}
