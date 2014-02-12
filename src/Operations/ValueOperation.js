function GetOperation() {
    this.make = function (value) {
        return {
            op: 'get',
            value: value
        };
    };

    this.execute = function (record, op, operations) {
        return record[op.value];
    };
}
