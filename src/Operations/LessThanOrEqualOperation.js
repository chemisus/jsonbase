function LessThanOrEqualOperation(record, op) {
    return this[op.lhs.op](record, op.lhs) <= this[op.rhs.op](record, op.rhs);
}
