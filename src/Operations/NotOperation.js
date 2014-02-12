function NotOperation() {
    this.make = function (value) {
        return {
            op: 'not',
            value: value
        };
    };

    this.execute = function (record, current, operations) {
        return !operations[current.value.op].execute(record, current.value, operations);
    };
}
