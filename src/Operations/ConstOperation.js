function ConstOperation() {
    this.make = function (value) {
        return {
            op: 'const',
            value: value
        };
    };

    this.execute = function (record, current, operations) {
        return current.value;
    };

    this.toSql = function (current, operations) {
        return current.value;
    };
}
