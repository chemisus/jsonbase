function ConstOperation() {
    this.make = function (value) {
        return {
            op: 'const',
            value: value
        };
    };

    this.execute = function (record, op, operations) {
        return op.value;
    };
}
