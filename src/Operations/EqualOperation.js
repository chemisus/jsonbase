function EqualOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'eq',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, current, operations) {
        return operations[current.lhs.op].execute(record, current.lhs, operations) === operations[current.rhs.op].execute(record, current.rhs, operations);
    };

    this.toSql = function (current, operations) {
        return operations[current.lhs.op].toSql(current.lhs, operations) +
            " = " +
            operations[current.rhs.op].toSql(current.rhs, operations);
    };
}
