function NotOperation(record, op) {
    return !this[op.value.op](record, op.value);
}
