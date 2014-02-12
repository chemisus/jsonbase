function NotOperation() {
    this.make = function (value) {
        return {
            op: 'not',
            value: value
        };
    };

    this.execute = function (record, op, operations) {
        return !operations[op.value.op].execute(record, op.value, operations);
    };
}
