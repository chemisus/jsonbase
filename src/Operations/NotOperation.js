function NotOperation(operations) {
    this.execute = function (record, op) {
        return !operations[op.value.op].execute(record, op.value);
    };
}
