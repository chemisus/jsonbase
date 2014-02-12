function ValueOperation() {
    this.make = function (value) {
        return {
            op: 'value',
            value: value
        };
    };

    this.execute = function (record, op, operations) {
        return record[op.value];
    };
}
